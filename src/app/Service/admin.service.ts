import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  
  GetSelaesPromote() {
    return this.http.get('https://localhost:44307/api/admin/GetSelaesPromote');
  }
  GetAlltableCountRow(data: any) {
    return this.http.post(
      'https://localhost:44307/api/admin/GetAlltableCountRow',
      data
    );
  }
  GetAllVideoCountInMonth(data: any) {
    return this.http.post(
      'https://localhost:44307/api/admin/GetAllVideoCountInMonth',
      data
    );
  }
  GetGenderCount() {
    return this.http.get('https://localhost:44307/api/admin/GetGenderCount');
  }
  GetTopFiveFollowerdUser() {
    return this.http.get(
      'https://localhost:44307/api/admin/GetTopFiveFollowerdUser'
    );
  }
  GetTopFivelikevideo() {
    return this.http.get(
      'https://localhost:44307/api/admin/GetTopFivelikevideo'
    );
  }
}
