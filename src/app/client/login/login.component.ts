import { Component, OnInit } from '@angular/core';
import { LazyLoadScriptService } from '../../services/lazy-load-script.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private lazyLoadService: LazyLoadScriptService) {}

  ngOnInit(): void {
    this.lazyLoadService.loadScript('assets/js/main.js').subscribe((_) => {
      console.log('JS is loaded!');
    });
  }
}
