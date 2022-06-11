import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { BrandService } from '../../../services/brand.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  brandId: string = '';
  brands: any[] = [];
  products: any = [];

  constructor(
    private route: ActivatedRoute,
    private brandService: BrandService,
    private productService: ProductService,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.getAllBrands();
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

  getAllBrands(): void {
    this.brandService.getAll().subscribe(
      (res) => {
        this.brands = res;
        console.log(this.brands);
      },
      (err) => console.log(err)
    );
  }

  refresh(): void {
    window.location.reload();
  }
}
