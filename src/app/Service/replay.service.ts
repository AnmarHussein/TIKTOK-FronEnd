import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ReplayService {
  uploadImagePath: any;
  uploadVideoPath: any;
  constructor(
    private http: HttpClient,
    private toster: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  Insert(data: any) {
    this.spinner.show();
    if (this.uploadImagePath != null) {
      data.imagePath = this.uploadImagePath;
      this.uploadImagePath = '';
    } else if (this.uploadVideoPath != null) {
      data.videoPath = this.uploadVideoPath;
      this.uploadVideoPath = '';
    }
    this.http
      .post('https://localhost:44307/api/Replay', data, {
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

  uploadImage(typeFile: number, file: FormData) {
    this.http
      .post('https://localhost:44307/api/Replay/uploadFile/' + typeFile, file)
      .subscribe(
        (data: any) => {
          if (typeFile === 1) {
            this.uploadImagePath = data.imagePath;
          } else if (typeFile === 2) {
            this.uploadVideoPath = data.imagePath;
            console.log(data.imagePath);
          }
        },
        (err) => {
          this.toster.error(err.message);
        }
      );
  }

  delete(data: any) {
    this.spinner.show();
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { id: data.id },
      responseType: 'text' as 'text',
    };
    this.http.delete('https://localhost:44307/api/Replay', options).subscribe(
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
