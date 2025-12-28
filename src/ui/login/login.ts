import { Component, inject, model } from '@angular/core';
import { AuthService } from '../../http/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  authService: AuthService = inject(AuthService);

  username = model<string>();
  password = model<string>();

  submit(): void {
    const username = this.username();
    const password = this.password();
    if (!username || !password) {
      window.alert('Missing username or password');
      return;
    }
    this.authService.login(username, password).subscribe((res) => {
      window.alert(`Logged in as ${res.userName}`);
    });
  }
}
