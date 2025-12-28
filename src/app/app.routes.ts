import { Routes } from '@angular/router';
import { App } from './app';
import { Login } from '../ui/login/login';
import { authGuard } from './auth-guard';

export const routes: Routes = [
  { path: '', component: App, canActivate: [authGuard] },
  { path: 'login', component: Login },
];
