import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { AuthGuard } from './helpers/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./components/auth/reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    loadComponent: () => import('./components/user-management/user-management.component').then(m => m.UserManagementComponent, ) 
  },
  {
    path: 'categories',
    loadComponent: () => import('./components/categories-management/categories-management.component').then(m => m.CategoriesManagementComponent)
  },
  {
    path: 'commodities',
    loadComponent: () => import('./components/commodities/commodities.component').then(m => m.CommoditiesComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./components/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent)
  },

];
