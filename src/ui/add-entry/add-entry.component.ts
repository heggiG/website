import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WishlistEntry, WishlistService } from '../../http/wishlist.service';

@Component({
  selector: 'app-add-entry',
  template: ` <form
    (ngSubmit)="addEntry(entryForm)"
    #entryForm="ngForm"
    class="add-entry-container"
  >
    <h3>Neuen Wunsch hinzufügen ✨</h3>

    <input
      name="name"
      [(ngModel)]="newEntry.name"
      #nameInput="ngModel"
      required
      placeholder="Was wünschst du dir? (Pflichtfeld)"
    />

    @if (nameInput.invalid && (nameInput.dirty || nameInput.touched || entryForm.submitted)) {
      <div class="error-msg">Der Name ist ein Pflichtfeld.</div>
    }

    <input
      name="description"
      [(ngModel)]="newEntry.description"
      placeholder="Weitere Details / Beschreibung"
    />
    <input name="link" [(ngModel)]="newEntry.link" placeholder="Link zur Shop-Seite (http://...)" />

    <div style="display: flex; gap: 16px;">
      <input
        name="prio"
        type="number"
        [(ngModel)]="newEntry.prio"
        placeholder="Priorität (z.B. 1)"
        style="flex: 1;"
      />
      <input
        name="price"
        type="number"
        [(ngModel)]="newEntry.price"
        placeholder="Preis in €"
        style="flex: 1;"
      />
    </div>

    <input name="type" [(ngModel)]="newEntry.type" placeholder="Kategorie (z.B. Buch, Technik)" />

    <button type="submit">Auf die Liste setzen</button>
  </form>`,
  imports: [FormsModule],
})
export class AddEntryComponent {
  private readonly wishlistService = inject(WishlistService);

  newEntry: WishlistEntry = {
    name: '',
    description: '',
    link: '',
    prio: NaN,
    price: NaN,
    type: '',
  };
  constructor() {}

  addEntry(form: any) {
    // 1. Angular-Validierung prüfen
    if (form.invalid) {
      return;
    }

    // 2. An den Service senden
    this.wishlistService.createEntry(this.newEntry).subscribe(() => {
      // 3. Nach Erfolg zurücksetzen!
      // this.newEntry = this.getEmptyEntry();
      // form.resetForm(this.getEmptyEntry()); // Setzt auch die Fehlerzustände (touched/dirty) zurück
    });
  }

  private getEmptyEntry(): WishlistEntry {
    return { name: '', description: '', link: '', prio: NaN, price: NaN, type: '' };
  }
}
