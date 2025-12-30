import { Routes } from '@angular/router';
import { Login } from '../ui/login/login';
import { authGuard } from './auth-guard';
import { Home } from '../ui/home/home';

export const routes: Routes = [
  { path: 'home/:user', component: Home, canActivate: [authGuard] },
  { path: 'login', component: Login },
];
