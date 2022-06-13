import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { BrandService } from '../../../services/brand.service';
import { ColorService } from '../../../services/color.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  @ViewChildren('subTotalWrap') subTotalItems!: QueryList<ElementRef>;
  @ViewChildren('subTotalWrap_existing')
  subTotalItems_existing!: QueryList<ElementRef>;

  brandId: string = '';
  prodName: string = '';
  memory: string = '';
  color: string = '';
  minPrice: number = 0;
  maxPrice: number = 50000000;
  sort: number = 1;

  //cart
  items: any[] = [];

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
    private formBuilder: FormBuilder,
    public cartService: CartService,
    private toast: NgToastService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.getAllBrands();
    this.getAllColor();
    this.brandId = this.route.snapshot.queryParamMap.get('brand') || '';
    this.prodName = this.route.snapshot.queryParamMap.get('name') || '';
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
      this.prodName,
      this.memory,
      this.color,
      this.minPrice,
      this.maxPrice,
      this.sort
    );
    // cart
    this.cartService.loadCart();
    this.items = this.cartService.getItems();
  }

  // cart
  //----- add item to cart
  addToCart(item: any): void {
    if (!this.cartService.itemInCart(item)) {
      item.qtyTotal = 1;
      item.colorSelected = item.colorIds[0];
      item.variationCost = (item.priceOut * (100 - item.discount)) / 100;
      // item = {
      //   ...item,
      //   qtyTotal: 1,
      // };
      this.cartService.addToCart(item); //add items in cart
      this.items = [...this.cartService.getItems()];
    }
    // Toast
    this.toast.success({
      detail: 'Success',
      summary: '🎉 Product has been added to the cart',
      position: 'tr',
      duration: 3000,
    });
  }

  changeSubtotal(item: any, index: number): void {
    const qty = item.qtyTotal;
    const amt = item.variationCost;
    const subTotal = amt * qty;
    const subTotal_converted = subTotal.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });

    this.subTotalItems.toArray()[index].nativeElement.innerHTML =
      subTotal_converted;
    this.cartService.saveCart();
  }

  get total() {
    return this.items.reduce(
      (sum, x) => ({
        qtyTotal: 1,
        variationCost: sum.variationCost + x.qtyTotal * x.variationCost,
      }),
      { qtyTotal: 1, variationCost: 0 }
    ).variationCost;
  }

  //----- remove specific item
  removeFromCart(item: any) {
    this.cartService.removeItem(item);
    this.items = this.cartService.getItems();
    // Toast
    this.toast.success({
      detail: 'Success',
      summary: 'Product has been removed from cart',
      position: 'tr',
      duration: 3000,
    });
  }

  //----- clear cart item
  clearCart(items: any) {
    // this.items.forEach((item, index) => this.cartService.removeItem(index));
    this.cartService.clearCart(items);
    this.items = [...this.cartService.getItems()];
  }
  // end handle cart

  loadProducts(
    brandId: string,
    prodName: string,
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

        if (prodName !== '') {
          this.products = this.products.filter((p) =>
            p.productName.toLowerCase().includes(prodName.toLowerCase())
          );
          console.log('run', prodName);
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
