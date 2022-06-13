import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { ColorService } from '../../../services/color.service';
import { CartService } from '../../../services/cart.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  @ViewChildren('subTotalWrap') subTotalItems!: QueryList<ElementRef>;
  @ViewChildren('subTotalWrap_existing')
  subTotalItems_existing!: QueryList<ElementRef>;

  productId: string = '';
  product: any = {};
  otherproducts: any[] = [];
  colors: any[] = [];
  colorSelected: number = 0;
  quantitySelected: number = 1;

  //cart
  items: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private colorService: ColorService,
    public cartService: CartService,
    private toast: NgToastService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.queryParamMap.get('id') || '';
    this.loadproduct(this.productId);
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
