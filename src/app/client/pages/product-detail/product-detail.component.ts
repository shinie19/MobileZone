import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  productId: string = '';
  product: any = {};

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.queryParamMap.get('id') || '';
    this.loadproduct(this.productId);
  }

  loadproduct(productId: string): void {
    this.productService.getById(productId).subscribe(
      (res) => {
        this.product = this.convertProductImages(res);
        console.log(this.product);
      },
      (err) => console.log(err)
    );
  }

  convertProductImages(product: any): any {
    let str: string = product['images'];
    return {
      ...product,
      images: str.split(';'),
    };
  }
}
