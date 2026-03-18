import { Routes } from '@angular/router';
import { Login } from '../ui/login/login';
import { Register } from '../ui/register/register';
import { Home } from '../ui/home/home';
import { authGuard } from './auth-guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'home/:user', component: Home, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
