import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  brandId: string = '';
  products: any = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.brandId = this.route.snapshot.queryParamMap.get('brand') || '';
    // console.log('brand-id: ', this.brandId);
    this.loadProducts(this.brandId);
  }

  loadProducts(brandId: string): void {
    if (brandId !== '') {
      console.log('brand', brandId);
      this.getProductsbyBrandId(brandId);
    } else {
      console.log('no');
      this.getAllProducts();
    }
  }

  convertProductImages(products: any[]): any[] {
    let res = [];
    for (let p of products) {
      let str: string = p['images'];
      res.push({
        ...(p as Record<string, unknown>),
        images: str.split(';'),
      });
    }
    return res;
  }

  getAllProducts(): void {
    this.productService.getAll().subscribe(
      (res) => {
        this.products = this.convertProductImages(res);
      },
      (err) => console.log(err)
    );
  }

  getProductsbyBrandId(id: string): void {
    this.productService.getByBrandId(id).subscribe(
      (res) => {
        this.products = this.convertProductImages(res);
      },
      (err) => console.log(err)
    );
  }
}
