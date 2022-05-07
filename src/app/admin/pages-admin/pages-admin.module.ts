import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesAdminComponent } from './pages-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PagesAdminComponent,
    children: [{ path: '', component: DashboardComponent }],
  },
];

@NgModule({
  declarations: [PagesAdminComponent, DashboardComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class PagesAdminModule {}
