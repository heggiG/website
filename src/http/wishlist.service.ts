// src/http/wishlist.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WishlistEntry {
  id?: number;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/wishlist'; // Anpassen an dein Backend

  getEntries(): Observable<WishlistEntry[]> {
    return this.http.get<WishlistEntry[]>(this.apiUrl);
  }

  createEntry(entry: WishlistEntry): Observable<WishlistEntry> {
    return this.http.post<WishlistEntry>(this.apiUrl, entry);
  }

  deleteEntry(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
