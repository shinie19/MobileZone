import { Component, OnInit } from '@angular/core';
import { LazyLoadScriptService } from 'src/app/services/lazy-load-script.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private lazyLoadService: LazyLoadScriptService) {}

  ngOnInit(): void {
    this.lazyLoadService
      .loadScript('assets/vendors/js/vendor.bundle.base.js')
      .subscribe((_) => {
        console.log('JS is loaded!');
      });

    this.lazyLoadService
      .loadScript('assets/vendors/js/vendor.bundle.addons.js')
      .subscribe((_) => {
        console.log('JS is loaded!');
      });

    this.lazyLoadService
      .loadScript('assets/js/off-canvas.js')
      .subscribe((_) => {
        console.log('JS is loaded!');
      });

    this.lazyLoadService
      .loadScript('assets/js/hoverable-collapse.js')
      .subscribe((_) => {
        console.log('JS is loaded!');
      });

    this.lazyLoadService.loadScript('assets/js/misc.js').subscribe((_) => {
      console.log('JS is loaded!');
    });

    this.lazyLoadService.loadScript('assets/js/settings.js').subscribe((_) => {
      console.log('JS is loaded!');
    });

    this.lazyLoadService.loadScript('assets/js/todolist.js').subscribe((_) => {
      console.log('JS is loaded!');
    });
  }
}
