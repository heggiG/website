// src/ui/list/list.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService, WishlistEntry } from '../../http/wishlist.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    @for (item of items; track item.id) {
      <div class="wish-item">
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </div>
    }
  `,
})
export class List implements OnInit {
  private wishlistService = inject(WishlistService);
  items: WishlistEntry[] = [];

  ngOnInit() {
    this.wishlistService.getEntries().subscribe((data) => {
      this.items = data;
    });
  }
}
