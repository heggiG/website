import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UpperCasePipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('website');
}
