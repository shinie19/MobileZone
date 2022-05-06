import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'login', component: LoginComponent },
      {
        path: '',
        loadChildren: () =>
          import('./pages-admin/pages-admin.module').then(
            (m) => m.PagesAdminModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [AdminComponent, LoginComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AdminModule {}
