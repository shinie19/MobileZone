import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { ColorService } from '../../../services/color.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  productId: string = '';
  product: any = {};
  otherproducts: any[] = [];
  colors: any[] = [];
  colorSelected: number = 0;
  quantitySelected: number = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private colorService: ColorService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.queryParamMap.get('id') || '';
    this.loadproduct(this.productId);
  }

  loadproduct(productId: string): void {
    this.productService.getById(productId).subscribe(
      (res) => {
        this.product = this.convertProductImages(res);
        console.log(this.product);
        for (let i = 0; i < this.product.colorIds.length; i++) {
          this.colorService
            .getById(this.product.colorIds[i])
            .subscribe((res) => {
              this.colors.push(res);
            });
        }
        // console.log(this.colors);
        this.productService
          .getByBrandId(this.product.brandId)
          .subscribe((res) => {
            this.otherproducts = this.convertProductImages_arr(res);
            this.otherproducts = this.otherproducts.filter(
              (p) => p.productId !== this.product.productId
            );
            console.log(this.otherproducts);
          });
      },
      (err) => console.log(err)
    );
  }

  convertProductImages_arr(products: any[]): any[] {
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

  convertProductImages(product: any): any {
    let str: string = product.images;
    return {
      ...product,
      images: str.split(';'),
    };
  }

  getColorSeclected(): void {
    this.colorSelected = +this.colorSelected;
  }
}
