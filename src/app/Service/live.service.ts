import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LiveService {
  allLive: any = [];
  constructor(private http: HttpClient) {}

  AddLive(data: any) {
    this.http.post('https://localhost:44307/api/live/Addlive', data).subscribe(
      (res: any) => {
        console.log(res.message);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  EndLive(data: any) {
    this.http
      .put('https://localhost:44307/api/live/EndLive', data, {
        responseType: 'text' as 'text',
      })
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }
  GetLiveActive() {
    return this.http.get('https://localhost:44307/api/live/GetActiveLive');
  }
}
