import { HttpClient } from '@angular/common/http';
import { BindingPipe } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  followers: any;
  following: any;
  videos: any;
  ReplayAll: any;
  LikeAll: any;
  CountLike: any;
  CountReplay: any;
  constructor(
    private http: HttpClient,
    private toster: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  GetAllFollowers(data: any) {
    this.spinner.show();
    this.http
      .post('https://localhost:44307/api/profile/GetAllFollowers', {
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

  GetAllFollowing(data: any) {
    this.spinner.show();
    this.http
      .post('https://localhost:44307/api/profile/GetAllFollowing', {
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

  GetAllVidoesToUser(data: any) {
    this.spinner.show();
    this.http
      .post('https://localhost:44307/api/profile/GetAllVidoesToUser', {
        id: data.id,
      })
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

  BlockUserAdmin(data: any) {
    data.isBlock = data.isBlock == 0 ? 1 : 0;
    this.spinner.show();
    this.http
      .post('https://localhost:44307/api/profile/BlockUserAdmin', {
        id: data.id,
        isBlock: data.isBlock,
        userName: data.userName,
        email: data.email,
      })
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.toster.success(res.message);
        },
        (err) => {
          this.spinner.hide();
          this.toster.error(err.message);
        }
      );
  }

  BlockVideoAdmin(data: any) {
    data.isBlock = data.isBlock == 0 ? 1 : 0;
    this.spinner.show();
    this.http
      .post('https://localhost:44307/api/profile/BlockVideoAdmin', {
        id: data.id,
        isBlock: data.isBlock,
        title: data.title,
      })
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.toster.success(res.message);
        },
        (err) => {
          this.spinner.hide();
          this.toster.error(err.message);
        }
      );
  }

  GetAllReplayVideo(data: any) {
    this.spinner.show();
    this.http
      .post('https://localhost:44307/api/profile/GetAllReplayVideo', {
        id: data,
      })
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.ReplayAll = res;
        },
        (err) => {
          this.spinner.hide();
          this.toster.error(err);
        }
      );
  }
  GetAllLikeVideo(data: any) {
    this.spinner.show();
    this.http
      .post('https://localhost:44307/api/profile/GetAllLikeVideo', {
        id: data,
      })
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.LikeAll = res;
        },
        (err) => {
          this.spinner.hide();
          this.toster.error(err);
        }
      );
  }
  GetCountReplayVideo(data: any) {
    this.spinner.show();
    this.http
      .post('https://localhost:44307/api/profile/GetCountReplayVideo', {
        id: data,
      })
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.CountReplay = res;
        },
        (err) => {
          this.spinner.hide();
          this.toster.error(err);
        }
      );
  }

  GetCountLikeVideo(data: any) {
    this.spinner.show();
    this.http
      .post('https://localhost:44307/api/profile/GetCountLikeVideo', {
        id: data,
      })
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.CountLike = res;
        },
        (err) => {
          this.spinner.hide();
          this.toster.error(err);
        }
      );
  }

  GetAllVideoAndCount(data: any) {
    this.spinner.show();
    this.http
      .post('https://localhost:44307/api/profile/GetAllVideoAndCount', {
        id: Number(data.id),
      })
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
  AddFollower(data: any) {
    this.http
      .post('https://localhost:44307/api/FOLLOWER', data, {
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
