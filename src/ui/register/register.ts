import { Component, inject, model } from '@angular/core';
import { AuthService } from '../../http/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="register-container">
      <h2>Registrieren</h2>
      <input [(ngModel)]="firstname" placeholder="Vorname" />
      <input [(ngModel)]="lastname" placeholder="Nachname" />
      <input [(ngModel)]="username" placeholder="Benutzername" />
      <input [(ngModel)]="password" type="password" placeholder="Passwort" />
      <button (click)="onRegister()">Konto erstellen</button>
    </div>
  `,
  styles: [
    `
      .register-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 300px;
        margin: auto;
      }
    `,
  ],
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);

  username = model('');
  password = model('');
  firstname = model('');
  lastname = model('');

  onRegister() {
    this.authService
      .register(this.username(), this.password(), this.firstname(), this.lastname())
      .subscribe({
        next: () => {
          alert('Registrierung erfolgreich! Bitte logge dich ein.');
          this.router.navigate(['/login']);
        },
        error: (err) => alert('Fehler bei der Registrierung: ' + err.error.message),
      });
  }
}
