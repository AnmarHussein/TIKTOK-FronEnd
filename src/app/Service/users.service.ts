import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private http: HttpClient,
    private toster: ToastrService,
    private spinner: NgxSpinnerService,
    private dataShare: DataService
  ) {}

  userInfo: any;
  imageUser: any;
  listIdAndUserName: any = [];
  getAll() {
    return this.http.get('https://localhost:44307/api/User1');
  }

  GetUserById(data: any) {
    this.spinner.show();

    this.http
      .post('https://localhost:44307/api/User1/GetByID', { id: data })
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.userInfo = res;
        },
        (err) => {
          this.spinner.hide();
          this.toster.error(err);
        }
      );
  }
  Insert(data: any) {
    this.spinner.show();
    if (this.imageUser !== null) {
      data.imagePath = this.imageUser;
    }
    this.http
      .post('https://localhost:44307/api/User1', data, {
        responseType: 'text' as 'text',
      })
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.toster.success(res);
        },
        (err) => {
          this.spinner.hide();
          this.toster.error(err);
        }
      );
    window.location.reload();
  }

  delete(data: any) {
    this.spinner.show();
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
      responseType: 'text' as 'text',
    };
    this.http.delete('https://localhost:44307/api/User1', options).subscribe(
      (res) => {
        this.spinner.hide();
        this.toster.success(res);
      },
      (err) => {
        this.spinner.hide();
        this.toster.success(err);
      }
    );
    window.location.reload();
  }

  update(data: any) {
    this.spinner.show();
    if (this.imageUser !== null) {
      data.imagePath = this.imageUser;
    }
    if (data.imagePath == null) {
      data.imagePath = data.imagePathOld;
    }
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain; charset=utf-8'
    );
    this.http
      .put('https://localhost:44307/api/User1', data, {
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

    window.location.reload();
  }

  uploadImage(file: FormData) {
    this.http
      .post('https://localhost:44307/api/User1/uploadImage', file)
      .subscribe(
        (data: any) => {
          this.imageUser = data.imagePath;
          console.log(this.imageUser);
        },
        (err) => {
          this.toster.error(err.message);
        }
      );
  }

  getAllUserNameAndId() {
    this.spinner.show();
    this.http.get('https://localhost:44307/api/User1').subscribe((res: any) => {
      this.listIdAndUserName = res.map((x: any) => {
        return { id: x.id, userName: x.userName, imagePath: x.imagePath };
      });
      this.spinner.hide();
    });
  }
}
