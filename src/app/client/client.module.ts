import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      { path: 'login', component: LoginComponent },
      {
        path: '',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
    ],
  },
];

@NgModule({
  declarations: [ClientComponent, LoginComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ClientModule {}
