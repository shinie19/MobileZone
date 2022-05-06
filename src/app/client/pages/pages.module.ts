import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
    ],
  },
];

@NgModule({
  declarations: [PagesComponent, HomeComponent, AboutComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class PagesModule {}
