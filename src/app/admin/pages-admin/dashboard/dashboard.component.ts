import { Component, OnInit } from '@angular/core';
import { LazyLoadScriptService } from '../../../services/lazy-load-script.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private lazyLoadService: LazyLoadScriptService) {}

  ngOnInit(): void {
    this.lazyLoadService.loadScript('assets/js/dashboard.js').subscribe((_) => {
      console.log('JS is loaded!');
    });
  }
}
