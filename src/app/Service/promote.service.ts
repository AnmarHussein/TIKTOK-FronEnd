import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class PromoteService {
  constructor(
    private http: HttpClient,
    private toster: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  GetAllPromoteInner() {
    return this.http.get(
      'https://localhost:44307/api/admin/GetAllPromoteInner'
    );
  }
  getAllPromote() {
    return this.http.get('https://localhost:44307/api/promote');
  }

  InsertPromote(data: any) {
    this.spinner.show();
    this.http
      .post('https://localhost:44307/api/promote', data, {
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

  updatePromote(data: any) {
    this.spinner.show();
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain; charset=utf-8'
    );
    this.http
      .put('https://localhost:44307/api/promote', data, {
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

  delete(data: any) {
    this.spinner.show();
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
      responseType: 'text' as 'text',
    };
    this.http.delete('https://localhost:44307/api/promote', options).subscribe(
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
}
