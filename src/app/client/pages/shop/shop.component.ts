import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { BrandService } from '../../../services/brand.service';
import { ColorService } from '../../../services/color.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  brandId: string = '';
  memory: string = '';
  color: string = '';
  minPrice: number = 0;
  maxPrice: number = 50000000;
  sort: number = 1;

  brands: any[] = [];
  colors: any[] = [];
  products: any[] = [];

  filterForm: FormGroup = this.formBuilder.group({
    memory: [''],
    color: [''],
  });

  filterPriceForm: FormGroup = this.formBuilder.group({
    minPrice: [''],
    maxPrice: [''],
  });

  sortItems: any[] = [
    { id: 1, name: 'Relevance' },
    { id: 2, name: 'Latest' },
    { id: 3, name: 'Oldest' },
    { id: 4, name: 'Price, low to high' },
    { id: 5, name: 'Price, high to low' },
  ];

  constructor(
    private route: ActivatedRoute,
    private brandService: BrandService,
    private colorService: ColorService,
    private productService: ProductService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.getAllBrands();
    this.getAllColor();
    this.brandId = this.route.snapshot.queryParamMap.get('brand') || '';
    this.memory = this.route.snapshot.queryParamMap.get('memory') || '';
    this.color = this.route.snapshot.queryParamMap.get('color') || '';
    this.minPrice = parseInt(
      this.route.snapshot.queryParamMap.get('minPrice') || ''
    );
    this.maxPrice = parseInt(
      this.route.snapshot.queryParamMap.get('maxPrice') || ''
    );
    this.sort = parseInt(this.route.snapshot.queryParamMap.get('sort') || '');

    // console.log('brand-id: ', this.brandId);
    this.loadProducts(
      this.brandId,
      this.memory,
      this.color,
      this.minPrice,
      this.maxPrice,
      this.sort
    );
  }

  loadProducts(
    brandId: string,
    memory: string,
    color: string,
    minPrice: number,
    maxPrice: number,
    sort: number
  ): void {
    this.productService.getAll().subscribe(
      (res) => {
        this.products = this.convertProductImages(res);

        if (brandId !== '') {
          this.productService.getByBrandId(brandId).subscribe(
            (res) => {
              this.products = this.convertProductImages(res);
            },
            (err) => console.log(err)
          );
        }

        if (memory !== '') {
          this.products = this.products.filter((p) =>
            p.productName.includes(memory)
          );
        }

        if (color !== '') {
          this.products = this.products.filter((p) =>
            p.colorIds.includes(parseInt(color))
          );
        }

        if (minPrice && maxPrice) {
          this.products = this.products.filter(
            (p) => p.priceOut >= minPrice && p.priceOut <= maxPrice
          );
        }

        if (sort === 2) {
          this.products.sort((a, b) => b.productId - a.productId);
        }
        if (sort === 3) {
          this.products.sort((a, b) => a.productId - b.productId); // b - a for reverse sort
        }
        if (sort === 4) {
          this.products.sort(
            (a, b) =>
              (a.priceOut * (100 - a.discount)) / 100 -
              (b.priceOut * (100 - b.discount)) / 100
          );
        }
        if (sort === 5) {
          this.products.sort(
            (a, b) =>
              (b.priceOut * (100 - b.discount)) / 100 -
              (a.priceOut * (100 - a.discount)) / 100
          );
        }
      },
      (err) => console.log(err)
    );
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

  getAllColor(): void {
    this.colorService.getAll().subscribe(
      (res) => {
        this.colors = res;
        console.log(this.colors);
      },
      (err) => console.log(err)
    );
  }

  filterMemory(): void {
    // console.log(this.filterForm.get('memory')?.value);
    // console.log(this.filterForm.get('color')?.value);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        memory: this.filterForm.get('memory')?.value,
        color: this.filterForm.get('color')?.value,
      },
      queryParamsHandling: 'merge',
    });
  }

  filterPrice(): void {
    // console.log(this.filterPriceForm.get('minPrice')?.value);
    // console.log(this.filterPriceForm.get('maxPrice')?.value);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        minPrice: this.filterPriceForm.get('minPrice')?.value,
        maxPrice: this.filterPriceForm.get('maxPrice')?.value,
      },
      queryParamsHandling: 'merge',
    });
  }

  selectOptionSort(value: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sort: value,
      },
      queryParamsHandling: 'merge',
    });
  }
}
