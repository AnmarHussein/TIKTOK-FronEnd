import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class VisaCardService {
  cardToSelect: any = [];
  constructor(
    private http: HttpClient,
    private toster: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  getAllVisaCard() {
    return this.http.get('https://localhost:44307/api/visacard');
  }

  InsertVisaCard(data: any) {
    this.spinner.show();
    this.http
      .post('https://localhost:44307/api/VISACARD', data, {
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
  }

  updateVisaCard(data: any) {
    this.spinner.show();
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain; charset=utf-8'
    );
    this.http
      .put('https://localhost:44307/api/visacard', data, {
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

  deleteVisaCard(data: any) {
    this.spinner.show();
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
      responseType: 'text' as 'text',
    };
    this.http.delete('https://localhost:44307/api/visacard', options).subscribe(
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

  GetIdAndCardNumberAndCardName() {
    this.spinner.show();
    this.http
      .get('https://localhost:44307/api/visacard')
      .subscribe((res: any) => {
        this.cardToSelect = res.map((x: any) => {
          return { id: x.id, cardName: x.cardName, cardNumber: x.cardNumber };
        });
        this.spinner.hide();
      });
  }
}
