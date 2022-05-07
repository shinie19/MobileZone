import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShopComponent } from './shop/shop.component';
import { ContactComponent } from './contact/contact.component';
import { BlogsComponent } from './blogs/blogs.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'account', component: AccountComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'shop', component: ShopComponent },
      { path: 'blogs', component: BlogsComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'cart', component: CartComponent },
    ],
  },
];

@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    AboutComponent,
    AccountComponent,
    WishlistComponent,
    CheckoutComponent,
    ShopComponent,
    BlogsComponent,
    ContactComponent,
    BlogsComponent,
    CartComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class PagesModule {}
