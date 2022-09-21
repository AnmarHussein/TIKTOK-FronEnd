import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  imageUser: any;
  constructor(
    private route: Router,
    private http: HttpClient,
    private toster: ToastrService,
    private spinner: NgxSpinnerService,
    private jwtHelper: JwtHelperService
  ) {}

  GetAuthUSer(data: any) {
    const headerDir = {
      'Contant-Type': 'application/json',
      Accept: 'application/json',
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDir),
    };

    this.spinner.show();
    this.http
      .post(
        'https://localhost:44307/api/Authentication/login',
        data,
        requestOptions
      )
      .subscribe(
        (res: any) => {
          const Token = res.token;
          if (this.jwtHelper.decodeToken(Token).Role == 'Admin') {
            localStorage.setItem('JWTToken', Token);
            this.route.navigate(['/admin']);
          } else {
            localStorage.setItem('JWTToken', Token);
            this.route.navigate(['/home']);
          }
          this.spinner.hide();
        },
        (err) => {
          this.toster.error(err.error);
          this.spinner.hide();
        }
      );
    this.route.navigate(['/home']);
  }

  isUserAuthntication(): boolean {
    let token: string | null = localStorage.getItem('JWTToken');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    return false;
  }

  LogOut() {
    localStorage.removeItem('JWTToken');
    window.location.reload();
  }

  GetUserToken() {
    let token = localStorage.getItem('JWTToken');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return this.jwtHelper.decodeToken(token);
    }
    return null;
  }
  Rigester(data: any) {
    this.spinner.show();
    const headerDir = {
      'Contant-Type': 'application/json',
      Accept: 'application/json',
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDir),
    };
    if (this.imageUser !== null) {
      data.imagePath = this.imageUser;
    }
    this.http
      .post(
        'https://localhost:44307/api/Authentication/Rigester',
        data,
        requestOptions
      )
      .subscribe(
        (res: any) => {
          this.toster.success(res);
          this.spinner.hide();
        },
        (err) => {
          this.toster.error(err.error);
          this.spinner.hide();
        }
      );
    this.route.navigate(['/home']);
  }
  uploadImage(file: FormData) {
    this.http
      .post('https://localhost:44307/api/User1/uploadImage', file)
      .subscribe(
        (data: any) => {
          this.imageUser = data.imagePath;
        },
        (err) => {
          this.toster.error(err.message);
        }
      );
  }

  ConfirmEmail(data: any) {
    this.spinner.show();
    const headerDir = {
      'Contant-Type': 'application/json',
      Accept: 'application/json',
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDir),
    };
    this.http
      .post(
        'https://localhost:44307/api/Authentication/ConfirmEmail',
        data,
        requestOptions
      )
      .subscribe(
        (res: any) => {
          this.toster.success(res);
          this.spinner.hide();
        },
        (err) => {
          this.toster.error(err.error);
          this.spinner.hide();
        }
      );
    this.route.navigate(['/home']);
  }
  ForgetPassWord(data: any) {
    this.spinner.show();
    const headerDir = {
      'Contant-Type': 'application/json',
      Accept: 'application/json',
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDir),
    };
    this.http
      .post(
        'https://localhost:44307/api/Authentication/ForgetPassWord',
        data,
        requestOptions
      )
      .subscribe(
        (res: any) => {
          this.toster.success(res);
          this.spinner.hide();
        },
        (err) => {
          this.toster.error(err.error);
          this.spinner.hide();
        }
      );
    this.route.navigate(['/home']);
  }
  SendForgetPassWord(data: any) {
    this.spinner.show();
    const headerDir = {
      'Contant-Type': 'application/json',
      Accept: 'application/json',
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDir),
    };
    this.http
      .post(
        'https://localhost:44307/api/Authentication/SendTokenForgetPassWord',
        data,
        requestOptions
      )
      .subscribe(
        (res: any) => {
          this.toster.success(res);
          this.spinner.hide();
        },
        (err) => {
          this.toster.error(err.error);
          this.spinner.hide();
        }
      );
    this.route.navigate(['/home']);
  }
}
