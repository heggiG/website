import { Component } from '@angular/core';
import { TopBar } from '../top-bar/top-bar';

@Component({
  selector: 'app-home',
  imports: [TopBar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
