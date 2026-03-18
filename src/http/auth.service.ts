// src/http/auth.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

interface LoginResponse {
  access_token: string;
  userName: string;
  firstName: string;
  lastName: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedInUser: LoginResponse | null = null;

  private readonly http: HttpClient = inject(HttpClient);
  private readonly router: Router = inject(Router);

  public constructor() {
    this.getFromSessionCookie();
  }

  public login(username: string, password: string) {
    return this.http
      .post<LoginResponse>('http://localhost:3000/auth/login', {
        username: username,
        password: password,
      })
      .pipe(
        tap((res) => {
          this.loggedInUser = res;
          // WICHTIG: "path=/;" hinzugefügt! So gilt das Cookie für die gesamte App
          // "max-age=86400" (optional) lässt es 24 Stunden leben, anstatt beim Schließen des Browsers zu löschen
          document.cookie = `SESSIONID=${res.access_token}; path=/; max-age=86400`;
        }),
      );
  }

  // Guard lässt den User jetzt auch durch, wenn nur das Cookie da ist (optimistisch)
  public isAuthenticated(): boolean {
    return !!this.loggedInUser || !!this.getTokenFromCookie();
  }

  // Interceptor kann das Token sofort lesen, auch wenn der Backend-Check noch läuft
  public getCurrentToken(): string | undefined {
    return this.loggedInUser?.access_token || this.getTokenFromCookie();
  }

  // Hilfsmethode, um das Cookie robust (mit trim()) auszulesen
  private getTokenFromCookie(): string | undefined {
    const sessionStr = document.cookie
      .split(';')
      .map((c) => c.trim())
      .find((c) => c.startsWith('SESSIONID='));

    return sessionStr ? sessionStr.split('SESSIONID=')[1] : undefined;
  }

  private getFromSessionCookie() {
    const token = this.getTokenFromCookie();
    if (!token) {
      return;
    }
    console.log(token);
    // Wir prüfen das Token im Hintergrund beim Backend
    this.http
      .get<Omit<LoginResponse, 'access_token'>>(`http://localhost:3000/auth/check/${token}`)
      .subscribe({
        next: (res) => {
          console.log('Login successful');
          this.loggedInUser = { access_token: token, ...res };
          // Nur navigieren, wenn wir noch auf Login oder der Startseite stehen,
          // sonst unterbrechen wir den Nutzer beim Neuladen auf einer Unterseite
          if (this.router.url.includes('/login') || this.router.url === '/') {
            this.router.navigate([`/home/${res.userName}`]);
          }
        },
        error: (res) => {
          console.log(res);
          console.log('Login failed');
          // Falls das Backend 401 Unauthorized meldet (Token abgelaufen/ungültig),
          // loggen wir den User direkt aus
          this.logout();
        },
      });
  }

  // Bequeme Logout-Methode hinzugefügt
  public logout() {
    this.loggedInUser = null;
    document.cookie = 'SESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    this.router.navigate(['/login']);
  }

  register(
    username: string,
    password: string,
    firstname: string,
    lastname: string,
  ): Observable<any> {
    return this.http.post('http://localhost:3000/auth/register', {
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
    });
  }
}
