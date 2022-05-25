import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LazyLoadScriptService } from '../../services/lazy-load-script.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private lazyLoadService: LazyLoadScriptService,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.lazyLoadService.loadScript('assets/js/main.js').subscribe((_) => {
      console.log('JS is loaded!');
    });
  }

  login() {
    this.authService
      .login(
        this.loginForm.get('email')?.value,
        this.loginForm.get('password')?.value
      )
      .subscribe(
        (res) => {
          // console.log(res);
          sessionStorage.setItem('token', res.authenticationToken);
          sessionStorage.setItem('isAdmin', res.isAdmin);
          if (res.isAdmin) {
            this.router.navigate(['/admin']);
          } else this.router.navigate(['/']);
        },
        (err) => {
          // console.log('Error');
          this.loginForm.controls['password'].setValue('');
          alert('Email or password incorrect, please try again!');
        }
      );
  }
}
