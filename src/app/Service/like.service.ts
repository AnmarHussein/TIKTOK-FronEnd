import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  AllLikeVideo: any;
  constructor(private http: HttpClient) {}

  GetAllLikeVideo(data: any) {
    return this.http.post(
      'https://localhost:44307/api/HomePage/GetAllLikeByVideo',
      data
    );
  }
  InserLike(data: any) {
    this.http
      .post('https://localhost:44307/api/Like1/', data, {
        responseType: 'text' as 'text',
      })
      .subscribe((res) => {
        console.log(res);
      });
  }

  DeleteLike(data: any) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
      responseType: 'text' as 'text',
    };
    this.http
      .delete('https://localhost:44307/api/HomePage/DeletLike', options)
      .subscribe((res) => {
        console.log('Delete Like');
      });
  }

  InsertFollower(data: any) {
    this.http
      .post('https://localhost:44307/api/Follower/', data, {
        responseType: 'text' as 'text',
      })
      .subscribe((res) => {
        console.log(res);
      });
  }
}
