import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { NgToastService } from 'ng-angular-popup';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { OrderDetailService } from '../../../services/order-detail.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  @ViewChildren('subTotalWrap') subTotalItems!: QueryList<ElementRef>;
  @ViewChildren('subTotalWrap_existing')
  subTotalItems_existing!: QueryList<ElementRef>;

  //cart
  items: any[] = [];
  shipFee: number = 50000;

  //Checkout form
  checkoutForm: FormGroup = new FormGroup({
    fullName: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{8})'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private router: Router,
    public cartService: CartService,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    // cart
    this.cartService.loadCart();
    this.items = this.cartService.getItems();
    if (!sessionStorage.getItem('userId')) {
      this.router.navigate(['/login']);
    }
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
    return (
      this.items.reduce(
        (sum, x) => ({
          qtyTotal: 1,
          variationCost: sum.variationCost + x.qtyTotal * x.variationCost,
        }),
        { qtyTotal: 1, variationCost: 0 }
      ).variationCost + this.shipFee
    );
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

  placeOrder(): void {
    if (this.checkoutForm.invalid) {
      this.toast.error({
        detail: 'Error',
        summary: 'Checkout form is invalid, try again!',
        position: 'tr',
        duration: 3000,
      });
    } else {
      let checkoutFormValue = this.checkoutForm.value;
      let order = {
        ...checkoutFormValue,
        userId: parseInt(sessionStorage.getItem('userId') || ''),
        total: this.total + this.shipFee,
      };

      // save order
      this.orderService.add(order).subscribe((res) => {
        let orderId = res.orderId;

        let orderDetails: any[] = [];
        this.items.forEach((item) => {
          let od = {
            orderId,
            productId: item.productId,
            colorId: item.colorSelected,
            quantity: item.qtyTotal,
            price:
              ((item.priceOut * (100 - item.discount)) / 100) * item.qtyTotal,
          };
          orderDetails.push(od);
        });
        console.log('Order', order);
        console.log('Order Details', orderDetails);
        // save order details
        orderDetails.forEach((od) => {
          this.orderDetailService.add(od).subscribe((res) => {
            console.log(res);
          });
        });

        this.toast.success({
          detail: 'Success',
          summary: '🎉 Place order successfully!',
          position: 'tr',
          duration: 5000,
        });
        this.router.navigate(['']);
      });
    }
  }
}
