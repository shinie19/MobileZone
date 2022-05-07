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
    this.lazyLoadService.loadScript('assets/js/main.js').subscribe((_) => {
      console.log('JS is loaded!');
    });
  }
}
