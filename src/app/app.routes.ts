import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'server-selection',
    loadComponent: () => import('./pages/server-selection/server-selection.page').then( m => m.ServerSelectionPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'layout-setup',
    loadComponent: () => import('./pages/layout-setup/layout-setup.page').then( m => m.LayoutSetupPage)
  },
];
