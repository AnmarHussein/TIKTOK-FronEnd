import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  UserStatistic: any;
  followers: any;
  following: any;
  videos: any;
  promoteByUser: any;
  countSeales: any;
  visaCard: any;
  constructor(
    private http: HttpClient,
    private toster: ToastrService,
    private spinner: NgxSpinnerService,
    private dataShare: DataService
  ) {}

  GetAllUserCountStatistic(data: any) {
    this.spinner.show();
    this.http
      .post(
        'https://localhost:44307/api/ProfileUser/GetAllUserCountStatistic',
        {
          id: Number(data.id),
        }
      )
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.UserStatistic = res;
        },
        (err) => {
          this.spinner.hide();
          this.toster.error(err);
        }
      );
  }

  GetAllFollwerBlock(data: any) {
    this.spinner.show();
    this.http
      .post('https://localhost:44307/api/ProfileUser/GetAllFollwerBlock', {
        id: Number(data.id),
      })
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.followers = res;
        },
        (err) => {
          this.spinner.hide();
          this.toster.error(err);
        }
      );
  }

  GetAllFollwingBlock(data: any) {
    this.spinner.show();
    this.http
      .post('https://localhost:44307/api/ProfileUser/GetAllFollwingBlock', {
        id: Number(data.id),
      })
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.following = res;
        },
        (err) => {
          this.spinner.hide();
          this.toster.error(err);
        }
      );
  }

  GetAllVideoLikeReplayCount(data: any) {
    this.spinner.show();
    this.http
      .post(
        'https://localhost:44307/api/ProfileUser/GetAllVideoLikeReplayCount',
        {
          id: Number(data.id),
        }
      )
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.videos = res;
        },
        (err) => {
          this.spinner.hide();
          this.toster.error(err);
        }
      );
  }

  DeleteFollower(data: any) {
    this.spinner.show();
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: Number(data.id),
      },
      responseType: 'text' as 'text',
    };
    this.http.delete('https://localhost:44307/api/FOLLOWER', options).subscribe(
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
  AddBlockUser(data: any) {
    this.spinner.show();
    this.http
      .post('https://localhost:44307/api/BLOCK1', data, {
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
  RemoveBlock(data: any) {
    this.spinner.show();
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: data.blockedUser,
      },
      responseType: 'text' as 'text',
    };
    this.http.delete('https://localhost:44307/api/BLOCK1', options).subscribe(
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
  GetUser(data: any) {
    return this.http.post(
      'https://localhost:44307/api/ProfileUser/GetAllUserCountStatistic',
      {
        id: Number(data.id),
      }
    );
  }
  GetVisaCardCountSumSaeles(data: any) {
    this.spinner.show();
    this.http
      .post(
        'https://localhost:44307/api/ProfileUser/GetVisaCardCountSumSaeles',
        {
          id: Number(data.id),
        }
      )
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.countSeales = res;
        },
        (err) => {
          this.spinner.hide();
          this.toster.error(err);
        }
      );
  }
  GetVisaCardByUser(data: any) {
    this.spinner.show();
    this.http
      .post('https://localhost:44307/api/ProfileUser/GetVisaCardByUser', {
        id: Number(data.id),
      })
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.visaCard = res;
        },
        (err) => {
          this.spinner.hide();
          this.toster.error(err);
        }
      );
  }
  GetAllPromotVideoByUser(data: any) {
    this.spinner.show();
    this.http
      .post('https://localhost:44307/api/ProfileUser/GetAllPromotVideoByUser', {
        id: Number(data.id),
      })
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.promoteByUser = res;
        },
        (err) => {
          this.spinner.hide();
          this.toster.error(err);
        }
      );
  }

  InsertPromote(data: any) {
    this.spinner.show();
    this.http
      .post('https://localhost:44307/api/ProfileUser/InsertPromote', data, {
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
  
}
