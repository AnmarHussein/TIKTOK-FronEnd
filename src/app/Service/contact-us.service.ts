import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  constructor(
    private http: HttpClient,
    private toster: ToastrService,
    private spinner: NgxSpinnerService,
    private route: Router
  ) {}

  GetAllContactUS() {
    return this.http.get('https://localhost:44307/api/ContactUS');
  }
  GetInboxStatstic() {
    return this.http.get('https://localhost:44307/api/ContactUS/InboxStatstic');
  }
  GetByIdContactUS(data: any) {
    return this.http.post('https://localhost:44307/api/ContactUS/GetById', {
      id: data,
    });
  }
  InsertContactUS(data: any) {
    this.spinner.show();
    this.http
      .post('https://localhost:44307/api/ContactUs', data, {
        responseType: 'text' as 'text',
      })
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.toster.success(res);
        },
        (err) => {
          this.spinner.hide();
          this.toster.error(err.message);
        }
      );
    this.route.navigate(['/home']);
  }

  importantMailUpdate(data: any) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain; charset=utf-8'
    );
    this.http
      .put('https://localhost:44307/api/ContactUs/important', data, {
        responseType: 'text' as 'text',
      })
      .subscribe(
        (res) => {
          this.toster.success(res);
        },
        (err) => {
          this.toster.success(err);
        }
      );
    window.location.reload();
  }

  ReadEmailUpdate(data: any) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain; charset=utf-8'
    );
    this.http
      .put('https://localhost:44307/api/ContactUs/ReadEmail', data, {
        responseType: 'text' as 'text',
      })
      .subscribe(
        (res) => {
          this.toster.success(res);
        },
        (err) => {
          this.toster.success(err);
        }
      );
    window.location.reload();
  }

  TrashMailUpdate(data: any) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain; charset=utf-8'
    );
    this.http
      .put('https://localhost:44307/api/ContactUs/Trash', data, {
        responseType: 'text' as 'text',
      })
      .subscribe(
        (res) => {
          this.toster.success(res);
        },
        (err) => {
          this.toster.success(err);
        }
      );
    window.location.reload();
  }

  RemoverTrashMailUpdate(data: any) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain; charset=utf-8'
    );
    this.http
      .put('https://localhost:44307/api/ContactUs/TrashRemove', data, {
        responseType: 'text' as 'text',
      })
      .subscribe(
        (res) => {
          this.toster.success(res);
        },
        (err) => {
          this.toster.success(err);
        }
      );
    window.location.reload();
  }
  SendEmailWebToUser(data: any) {
    this.spinner.show();
    this.http
      .post('https://localhost:44307/api/ContactUs/SendEmailWebToUser', data, {
        responseType: 'text' as 'text',
      })
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.toster.success(res);
        },
        (err) => {
          this.spinner.hide();
          this.toster.error(err.message);
        }
      );
  }

  SendEmailPdf(typeSend: number, file: FormData) {
    this.spinner.show();
    this.http
      .post('https://localhost:44307/api/ContactUs/SendEmailPdf/'+typeSend, file, {
        responseType: 'text' as 'text',
      })
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.toster.success(res);
        },
        (err) => {
          this.spinner.hide();
          this.toster.error(err.message);
        }
      );
  }
}
