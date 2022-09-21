import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomepageService {
  HomePAgeTagSubject = new Subject();
  HomePageTag: any;
  LinkTag: any;
  SuggestUser: any;
  VideoHome: any;
  userPage: any;
  videoUserPage: any;
  newLogo: any;
  constructor(
    private http: HttpClient,
    private toster: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  GetHomePageSubject(): Observable<any> {
    return this.HomePAgeTagSubject;
  }
  GetHomePage() {
    this.spinner.show();
    this.http.get('https://localhost:44307/api/HomePage/GetHomePage').subscribe(
      (res: any) => {
        this.HomePageTag = res;
        this.HomePAgeTagSubject.next(res);
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        this.toster.error(err.message);
      }
    );
  }
  GetLik1() {
    this.spinner.show();
    this.http.get('https://localhost:44307/api/HomePage/GetLik1').subscribe(
      (res: any) => {
        this.LinkTag = res;
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        this.toster.error(err.message);
      }
    );
  }
  GetSuggestUser(data: any) {
    this.spinner.show();
    this.http
      .post('https://localhost:44307/api/HomePage/GetSuggestUser', data)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.SuggestUser = res;
        },
        (err) => {
          this.spinner.hide();
          this.toster.error(err.message);
        }
      );
  }

  GetAllVideoHome(data: any) {
    this.spinner.show();
    this.http
      .post('https://localhost:44307/api/HomePage/GetAllVideoHome', data)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.VideoHome = res;
        },
        (err) => {
          this.spinner.hide();
          this.toster.error(err);
        }
      );
  }

  GetUserToPage(data: any) {
    this.spinner.show();
    this.http
      .post('https://localhost:44307/api/HomePage/GetUserToPage', data)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.userPage = res;
        },
        (err) => {
          this.spinner.hide();
          this.toster.error(err);
        }
      );
  }

  GetVideoToPage(data: any) {
    this.spinner.show();
    this.http
      .post('https://localhost:44307/api/HomePage/GetVideoToPage', data)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.videoUserPage = res;
        },
        (err) => {
          this.spinner.hide();
          this.toster.error(err);
        }
      );
  }

  uploadImage(file: FormData) {
    this.http
      .post('https://localhost:44307/api/User1/uploadImage', file)
      .subscribe(
        (data: any) => {
          this.newLogo = data.imagePath;
        },
        (err) => {
          this.toster.error(err.message);
        }
      );
  }
  UpdateHomePage(data: any) {
    this.spinner.show();
    console.log(data);
    if (this.newLogo != undefined) {
      data.navLogo = this.newLogo;
    } else if (this.newLogo == undefined) {
      data.navLogo = data.oldnavLogo;
    }
    console.log(data);
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain; charset=utf-8'
    );
    this.http
      .put('https://localhost:44307/api/HomePage/UpdateHomePage', data, {
        responseType: 'text' as 'text',
      })
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.toster.success(res);
        },
        (err) => {
          this.spinner.hide();
          this.toster.success(err);
        }
      );
  }
}
