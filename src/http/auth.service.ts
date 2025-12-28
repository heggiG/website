import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

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
  public constructor() {}

  public login(username: string, password: string) {
    return this.http
      .post<LoginResponse>('http://localhost:3000/auth/login', {
        username: username,
        password: password,
      })
      .pipe(
        tap((res) => {
          console.log(res);
          this.loggedInUser = res;
          document.cookie = `SESSIONID=${res.access_token}`;
        }),
      );
  }

  public isAuthenticated(): boolean {
    return !!this.loggedInUser;
  }
}
