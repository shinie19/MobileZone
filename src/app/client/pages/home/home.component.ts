import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../../services/brand.service';
import { SliderService } from '../../../services/slider.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private brandService: BrandService,
    private sliderService: SliderService
  ) {}

  sliders = [];
  brands = [];
  saleDate = '2022/06/21';

  ngOnInit(): void {
    this.sliderService.getAll().subscribe(
      (res) => {
        this.sliders = res;
        console.log(this.sliders);
      },
      (err) => {
        console.log;
      }
    );

    this.brandService.getAll().subscribe(
      (res) => {
        this.brands = res;
        console.log(this.brands);
      },
      (err) => console.log(err)
    );
  }
}
