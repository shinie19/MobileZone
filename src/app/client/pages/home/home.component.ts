import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { BrandService } from '../../../services/brand.service';
import { SliderService } from '../../../services/slider.service';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { ColorService } from '../../../services/color.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChildren('subTotalWrap') subTotalItems!: QueryList<ElementRef>;
  @ViewChildren('subTotalWrap_existing')
  subTotalItems_existing!: QueryList<ElementRef>;

  constructor(
    private brandService: BrandService,
    private sliderService: SliderService,
    private productService: ProductService,
    public cartService: CartService,
    private colorService: ColorService,
    private toast: NgToastService
  ) {}

  saleDate: string = '2022/06/21';
  sliders: any[] = [];
  brands: any[] = [];
  products: any[] = [];
  flashSaleProducts: any[] = [];
  newArrivalProducts: any[] = [];
  featuredProducts: any[] = [];
  bestSellerProducts: any[] = [];
  //cart
  items: any[] = [];
  // shipFee: number = 50000;
  // tax: number = 0;

  ngOnInit(): void {
    this.sliderService.getAll().subscribe(
      (res) => {
        this.sliders = res;
        // console.log(this.sliders);
      },
      (err) => {
        console.log;
      }
    );

    this.brandService.getAll().subscribe(
      (res) => {
        this.brands = res;
        // console.log(this.brands);
      },
      (err) => console.log(err)
    );
    this.getFlashSaleProducts();
    this.getAllProducts();
    this.getNewArrivalProduct();
    this.getFeaturedProducts();
    this.getBestSellerProducts();

    // cart
    this.cartService.loadCart();
    this.items = this.cartService.getItems();
  }

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

  getAllProducts(): void {
    this.productService.getAll().subscribe(
      (res) => (this.products = res),
      (err) => console.log(err)
    );
  }

  getFlashSaleProducts(): void {
    this.productService.getAll().subscribe(
      (res) => {
        let products: [] = res;
        this.flashSaleProducts = products.filter(
          (product) => product['countBuy'] > 5
        );
        this.flashSaleProducts = this.convertProductImages(
          this.flashSaleProducts
        );
        console.log(this.flashSaleProducts);
      },
      (err) => console.log(err)
    );
  }

  getNewArrivalProduct(): void {
    this.productService.getNewArrival().subscribe(
      (res) => {
        this.newArrivalProducts = this.convertProductImages(res);
        console.log(this.newArrivalProducts);
      },
      (err) => console.log(err)
    );
  }

  getFeaturedProducts(): void {
    this.productService.getFeaturedProducts().subscribe(
      (res) => {
        this.featuredProducts = this.convertProductImages(res);
        // console.log('aaaa', this.featuredProducts);
      },
      (err) => console.log(err)
    );
  }

  getBestSellerProducts(): void {
    this.productService.getBestSellerProducts().subscribe(
      (res) => {
        this.bestSellerProducts = this.convertProductImages(res);
        // console.log('aabbaa', this.bestSellerProducts);
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

  getColorName(id: string): any {
    this.colorService.getById(id).subscribe((res) => {
      console.log(res.name);
      return res.name;
    });
  }
}
