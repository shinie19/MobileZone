import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { BrandService } from '../../services/brand.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: any = {};
  brands: any[] = [];
  brandSelected: number = 0;
  searchValue: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
    this.getAllBrands();
  }

  getCurrentUser(): any {
    this.userService
      .getByEmail(sessionStorage.getItem('email') || '')
      .subscribe((res) => {
        this.user = res;
        console.log(this.user);
      });
  }

  getAllBrands(): void {
    this.brandService.getAll().subscribe((res) => {
      this.brands = res;
      console.log('brands', this.brands);
    });
  }

  logout(): void {
    window.sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  getBrandSeclected(): void {
    this.brandSelected = +this.brandSelected;
  }

  searchSubmit(): void {
    if (this.brandSelected != 0) {
      this.router.navigate(['/shop'], {
        queryParams: { brand: this.brandSelected, name: this.searchValue },
      });
    } else {
      this.router.navigate(['/shop'], {
        queryParams: { name: this.searchValue },
      });
    }
  }
}
