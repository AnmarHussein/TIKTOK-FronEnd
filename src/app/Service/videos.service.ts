import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class VideosService {
  videos: any = [];
  videoToSelect: any = [];
  constructor(
    private http: HttpClient,
    private toster: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  posterPath: any;
  VideoPath: any;
  getAll() {
    return this.http.get('https://localhost:44307/api/video');
  }
  Insert(data: any) {
    this.spinner.show();
    if (this.posterPath !== null) {
      data.posterPath = this.posterPath;
      this.posterPath = '';
    }
    if (this.VideoPath !== null) {
      data.VideoPath = this.VideoPath;
      this.VideoPath = '';
    }
    this.http
      .post('https://localhost:44307/api/video', data, {
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

  delete(id: any) {
    this.spinner.show();
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { id: id },
      responseType: 'text' as 'text',
    };
    this.http.delete('https://localhost:44307/api/video', options).subscribe(
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

  update(data: any) {
    this.spinner.show();
    if (this.posterPath !== null) {
      data.posterPath = this.posterPath;
      this.posterPath = null;
    }
    if (data.posterPath == null) {
      data.posterPath = data.oldposterPath;
    }
    if (this.VideoPath !== '') {
      data.videoPath = this.VideoPath;
      this.VideoPath = '';
    }
    if (data.videoPath == null) {
      data.videoPath = data.oldvideoPath;
    }
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain; charset=utf-8'
    );

    this.http
      .put('https://localhost:44307/api/video', data, {
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

  uploadImage(typeFile: number, file: FormData) {
    this.http
      .post('https://localhost:44307/api/video/uploadFile/' + typeFile, file)
      .subscribe(
        (data: any) => {
          if (typeFile === 1) {
            this.posterPath = data.posterPath;
          } else if (typeFile === 2) {
            this.VideoPath = data.posterPath;
          }
        },
        (err) => {
          this.toster.error(err.message);
        }
      );
  }

  GetIdAndPosterAndTitle() {
    this.spinner.show();
    this.http.get('https://localhost:44307/api/video').subscribe((res: any) => {
      this.videoToSelect = res.map((x: any) => {
        return { id: x.id, title: x.title, posterPath: x.posterPath };
      });
      this.spinner.hide();
    });
  }
}
