import { Component, OnInit } from '@angular/core';
import { LazyLoadScriptService } from '../../services/lazy-load-script.service';

@Component({
  selector: 'app-pages-admin',
  templateUrl: './pages-admin.component.html',
  styleUrls: ['./pages-admin.component.css'],
})
export class PagesAdminComponent implements OnInit {
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
