import { Component, OnInit } from '@angular/core';
import { LazyLoadScriptService } from '../../../services/lazy-load-script.service';
import { UserService } from '../../../services/user.service';
import { BrandService } from '../../../services/brand.service';
import { ProductService } from '../../../services/product.service';
import { OrderService } from '../../../services/order.service';
import { BlogService } from '../../../services/blog.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  users: number = 0;
  brands: number = 0;
  products: number = 0;
  orders: number = 0;
  blogs: number = 0;
  feedbacks: number = 25;

  constructor(
    private lazyLoadService: LazyLoadScriptService,
    private userService: UserService,
    private brandService: BrandService,
    private productService: ProductService,
    private orderService: OrderService,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.lazyLoadService.loadScript('assets/js/dashboard.js').subscribe((_) => {
      console.log('JS is loaded!');
    });
    this.loadData();
  }

  loadData(): void {
    this.userService.getAll().subscribe((res) => {
      this.users = res.length;
    });
    this.brandService.getAll().subscribe((res) => {
      this.brands = res.length;
    });
    this.productService.getAll().subscribe((res) => {
      this.products = res.length;
    });
    this.orderService.getAll().subscribe((res) => {
      this.orders = res.length;
    });
    this.blogService.getAll().subscribe((res) => {
      this.blogs = res.length;
    });
  }
}
