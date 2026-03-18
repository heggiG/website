// src/http/wishlist.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WishlistEntry {
  id?: number;
  name: string;
  description: string;
  link: string;
  prio: number;
  price: number;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/v1/wishlist';

  getEntries(): Observable<WishlistEntry[]> {
    return this.http.get<WishlistEntry[]>(`${this.apiUrl}/all`);
  }

  createEntry(entry: WishlistEntry): Observable<WishlistEntry> {
    return this.http.post<WishlistEntry>(`${this.apiUrl}/create`, entry);
  }

  deleteEntry(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
