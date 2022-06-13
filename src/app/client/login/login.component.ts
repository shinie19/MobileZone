import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../../services/auth.service';
import { LazyLoadScriptService } from '../../services/lazy-load-script.service';

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
    private authService: AuthService,
    private toast: NgToastService
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
          sessionStorage.setItem('userId', res.userId);
          sessionStorage.setItem('email', res.email);
          sessionStorage.setItem('isAdmin', res.isAdmin);
          if (res.isAdmin) {
            this.router.navigate(['/admin']);
          } else this.router.navigate(['/']);
          // Toast
          this.toast.success({
            detail: 'Success',
            summary: '🎉 You have successfully logged in',
            position: 'tr',
            duration: 3000,
          });
        },
        (err) => {
          // console.log('Error');
          this.loginForm.controls['password'].setValue('');
          // alert('Email or password incorrect, please try again!');
          // Toast
          this.toast.error({
            detail: 'Failed',
            summary: '⛔ Email or password incorrect!',
            position: 'tr',
            duration: 3000,
          });
        }
      );
  }
}
