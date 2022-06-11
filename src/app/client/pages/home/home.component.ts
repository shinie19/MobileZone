import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../../services/brand.service';
import { SliderService } from '../../../services/slider.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private brandService: BrandService,
    private sliderService: SliderService,
    private productService: ProductService
  ) {}

  saleDate: string = '2022/06/21';
  sliders: any[] = [];
  brands: any[] = [];
  products: any[] = [];
  flashSaleProducts: any[] = [];
  newArrivalProducts: any[] = [];
  featuredProducts: any[] = [];
  bestSellerProducts: any[] = [];

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
}
