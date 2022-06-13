import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesAdminComponent } from './pages-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductAdminComponent } from './product-admin/product-admin.component';
import { BrandAdminComponent } from './brand-admin/brand-admin.component';
import { OrderAdminComponent } from './order-admin/order-admin.component';
import { BlogAdminComponent } from './blog-admin/blog-admin.component';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { SliderAdminComponent } from './slider-admin/slider-admin.component';

const routes: Routes = [
  {
    path: '',
    component: PagesAdminComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'brands', component: BrandAdminComponent },
      { path: 'products', component: ProductAdminComponent },
      { path: 'orders', component: OrderAdminComponent },
      { path: 'blogs', component: BlogAdminComponent },
      { path: 'users', component: UserAdminComponent },
      { path: 'sliders', component: SliderAdminComponent },
    ],
  },
];

@NgModule({
  declarations: [
    PagesAdminComponent,
    DashboardComponent,
    ProductAdminComponent,
    BrandAdminComponent,
    OrderAdminComponent,
    BlogAdminComponent,
    UserAdminComponent,
    SliderAdminComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class PagesAdminModule {}
