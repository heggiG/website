import { Component } from '@angular/core';
import { TopBar } from '../top-bar/top-bar';
import { List } from '../list/list';

@Component({
  selector: 'app-home',
  imports: [TopBar, List],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
