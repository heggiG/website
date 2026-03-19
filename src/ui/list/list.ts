// src/ui/list/list.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WishlistService, WishlistEntry } from '../../http/wishlist.service';
import { MatDialog } from '@angular/material/dialog';
import { EditEntryComponent } from '../edit-entry/edit-entry.component';
import { MatButtonModule } from '@angular/material/button';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule],
  styleUrl: './list.css', // <-- Verlinkt die neue CSS-Datei
  template: `
    <div class="list-outer">
      <!--    <div class="add-entry">-->
      <button class="add-entry" mat-button (click)="openNewEntryEditor()">
        ✨ Neuen Eintrag hinzufügen ✨
      </button>
      <!--    </div>-->
      <div class="wishlist-grid">
        @for (item of items; track item.id) {
          <div class="wish-item">
            @if (item.prio) {
              <span class="prio-badge">Prio {{ item.prio }}</span>
            }

            <h3>{{ item.name }}</h3>
            <p class="description">{{ item.description }}</p>

            <div class="meta-data">
              @if (item.type) {
                <span>Typ: {{ item.type }}</span>
              }
              @if (item.price) {
                <span class="price">{{ item.price }} €</span>
              }
            </div>

            @if (item.link) {
              <a [href]="item.link" target="_blank" class="shop-link"> Zum Produkt &rarr; </a>
            }
          </div>
        }
      </div>
    </div>
  `,
})
export class List implements OnInit {
  private wishlistService = inject(WishlistService);
  private dialog = inject(MatDialog);
  items: WishlistEntry[] = [];

  public ngOnInit() {
    this.loadEntries();
  }

  public openNewEntryEditor(): void {
    this.dialog
      .open<EditEntryComponent, unknown, WishlistEntry>(EditEntryComponent)
      .afterClosed()
      .pipe(
        switchMap((entry) => {
          if (!entry) {
            return of(null);
          }
          return this.wishlistService.createEntry(entry);
        }),
      )
      .subscribe(() => this.loadEntries());
  }

  public loadEntries() {
    this.wishlistService.getEntries().subscribe((data) => {
      this.items = data;
    });
  }

  private getEmptyEntry(): WishlistEntry {
    return { name: '', description: '', link: '', prio: NaN, price: NaN, type: '' };
  }
}
