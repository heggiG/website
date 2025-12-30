import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

interface LoginResponse {
  access_token: string;
  userName: string;
  firstName: string;
  lastName: string;
}

@Injectable({ providedIn: 'root', deps: [HttpClient] })
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
          document.cookie = `SESSIONID=${res.access_token}`;
        }),
      );
  }

  public isAuthenticated(): boolean {
    return !!this.loggedInUser;
  }

  private getFromSessionCookie() {
    const session = document.cookie.split(';').find((c) => c.startsWith('SESSIONID='));
    if (!session) {
      return;
    }
    this.http
      .get<
        Omit<LoginResponse, 'access_token'>
      >(`http://localhost:3000/auth/check/${session.split('SESSIONID=')[1]}`)
      .subscribe((res) => {
        this.loggedInUser = { access_token: session, ...res };
        this.router.navigate([`/home/${res.userName}`]);
      });
  }
}
