import { Component, OnInit } from '@angular/core';
import { LazyLoadScriptService } from '../../services/lazy-load-script.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
})
export class PagesComponent implements OnInit {
  constructor(private lazyLoadService: LazyLoadScriptService) {}

  ngOnInit(): void {
    this.lazyLoadService
      .loadScript('assets/js/vendor/jquery-3.5.1.min.js')
      .subscribe((_) => {
        console.log('JS is loaded!');
      });
    this.lazyLoadService
      .loadScript('assets/js/vendor/modernizr-3.7.1.min.js')
      .subscribe((_) => {
        console.log('JS is loaded!');
      });
    this.lazyLoadService
      .loadScript('assets/js/vendor/jquery-ui.min.js')
      .subscribe((_) => {
        console.log('JS is loaded!');
      });
    this.lazyLoadService
      .loadScript('assets/js/vendor/bootstrap.bundle.js')
      .subscribe((_) => {
        console.log('JS is loaded!');
      });

    this.lazyLoadService
      .loadScript('assets/js/plugin/swiper.min.js')
      .subscribe((_) => {
        console.log('JS is loaded!');
      });
    this.lazyLoadService
      .loadScript('assets/js/plugin/jquery.countdown.min.js')
      .subscribe((_) => {
        console.log('JS is loaded!');
      });
    this.lazyLoadService
      .loadScript('assets/js/plugin/material-scrolltop.js')
      .subscribe((_) => {
        console.log('JS is loaded!');
      });
    this.lazyLoadService
      .loadScript('assets/js/plugin/price_range_script.js')
      .subscribe((_) => {
        console.log('JS is loaded!');
      });
    this.lazyLoadService
      .loadScript('assets/js/plugin/in-number.js')
      .subscribe((_) => {
        console.log('JS is loaded!');
      });
    this.lazyLoadService
      .loadScript('assets/js/plugin/jquery.elevateZoom-3.0.8.min.js')
      .subscribe((_) => {
        console.log('JS is loaded!');
      });
    this.lazyLoadService
      .loadScript('assets/js/plugin/venobox.min.js')
      .subscribe((_) => {
        console.log('JS is loaded!');
      });
    this.lazyLoadService.loadScript('assets/js/main.js').subscribe((_) => {
      console.log('JS is loaded!');
    });
  }
}
