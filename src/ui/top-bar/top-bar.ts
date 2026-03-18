import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faHouse, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-top-bar',
  imports: [MatIconButton, FaIconComponent],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.css',
})
export class TopBar {
  public readonly fasHouse = faHouse;
  public readonly fasUser = faUser;
}
