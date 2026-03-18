import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

export interface WishilstEntry {
  id: number;
  name: string;
  description: string;
  link: string;
  prio: number;
  price: number;
  type: string;
}

@Injectable()
export class WishlistService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly authService: AuthService = inject(AuthService);

  public constructor() {}

  public getForCurrentUser(): Observable<WishilstEntry[]> {
    return this.http.get<WishilstEntry[]>(`http://localhost:8000/api/v1/wishlist/all`, {
      headers: { Authorization: `Bearer ${this.authService.getCurrentToken()}` },
    });
  }
}
