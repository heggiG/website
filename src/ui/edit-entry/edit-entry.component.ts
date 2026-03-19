import { Component, Inject, inject, input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WishlistEntry, WishlistService } from '../../http/wishlist.service';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-entry',
  styleUrls: ['edit-entry.component.css'],
  template: `
    <!--    <div class="add-entry-container">-->
    <h3 matDialogTitle>Wunsch hinzufügen / ändern</h3>
    <form (ngSubmit)="submit(entryForm)" #entryForm="ngForm" class="add-entry-container">
      <input
        name="name"
        [(ngModel)]="entry.name"
        #nameInput="ngModel"
        required
        placeholder="Was wünschst du dir? (Pflichtfeld)"
      />

      @if (nameInput.invalid && (nameInput.dirty || nameInput.touched || entryForm.submitted)) {
        <div class="error-msg">Der Name ist ein Pflichtfeld.</div>
      }

      <input
        name="description"
        [(ngModel)]="entry.description"
        placeholder="Weitere Details / Beschreibung"
      />
      <input name="link" [(ngModel)]="entry.link" placeholder="Link zur Shop-Seite (http://...)" />

      <div style="display: flex; gap: 16px;">
        <input
          name="prio"
          type="number"
          [(ngModel)]="entry.prio"
          placeholder="Priorität (z.B. 1)"
          style="flex: 1;"
        />
        <input
          name="price"
          type="number"
          step="0.01"
          min="0"
          [(ngModel)]="entry.price"
          placeholder="Preis in €"
          style="flex: 1;"
        />
      </div>

      <input name="type" [(ngModel)]="entry.type" placeholder="Kategorie (z.B. Buch, Technik)" />
    </form>
    <mat-dialog-actions>
      <button (click)="dialogRef.close(null)">Abbrechen</button>
      <button type="submit" (click)="this.submit(entryForm)">Auf die Liste setzen</button>
    </mat-dialog-actions>
    <!--  </div>-->
  `,
  imports: [FormsModule, MatDialogModule],
})
export class EditEntryComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);

  public dialogRef = inject(MatDialogRef<EditEntryComponent>);
  public entry = inject<WishlistEntry>(MAT_DIALOG_DATA);

  constructor() {}

  ngOnInit(): void {
    if (!this.entry) {
      this.entry = this.getEmptyEntry();
    }
  }

  public submit(form: any) {
    // 1. Angular-Validierung prüfen
    if (form.invalid) {
      return;
    }
    this.dialogRef.close(this.entry);
  }

  private getEmptyEntry(): WishlistEntry {
    return { name: '', description: '', link: '', prio: NaN, price: NaN, type: '' };
  }
}
