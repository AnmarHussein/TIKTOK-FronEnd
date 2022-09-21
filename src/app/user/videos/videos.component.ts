import { DialogModule } from '@angular/cdk/dialog';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CommnetComponent } from 'src/app/admin/commnet/commnet.component';
import { LikesComponent } from 'src/app/admin/likes/likes.component';
import { DataService } from 'src/app/Service/data.service';
import { UserProfileService } from 'src/app/Service/user-profile.service';
import { VideosService } from 'src/app/Service/videos.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css'],
})
export class VideosComponent implements OnInit {
  user: any;
  @ViewChild('_addVideosTemplate') _addVideosTemplate!: TemplateRef<any>;
  @ViewChild('_EditVideosTemplate') _EditVideosTemplate!: TemplateRef<any>;

  createVideos: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    posterPath: new FormControl(''),
    videoPath: new FormControl(''),
    userId: new FormControl(''),
  });
  constructor(
    private jwtHellper: JwtHelperService,
    public userProfile: UserProfileService,
    private dialog: MatDialog,
    private shaerData: DataService,
    private videoServise: VideosService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.user = this.jwtHellper.decodeToken(localStorage.getItem('JWTToken')!);
    this.userProfile.GetAllVideoLikeReplayCount(this.user);
  }

  OpenDialogComment(videoid: any) {
    this.dialog.open(CommnetComponent, {
      position: { top: '100px', left: '400px' },
      width: '700px',
      height: '500px',
    });
    this.shaerData.anyData = videoid;
  }
  OpenDialogLikes(videoid: any) {
    this.dialog.open(LikesComponent, {
      position: { top: '100px', left: '400px' },
      width: '700px',
      height: '500px',
    });
    this.shaerData.anyData = videoid;
  }

  OpenDilaogAddVideo() {
    this.dialog.open(this._addVideosTemplate, {
      position: { top: '82px' },
      width: '600px',
      height: '405px',
    });
  }

  AddVidoe() {
    if (!this.createVideos.valid) {
      this.createVideos.reset();
      this.dialog.closeAll();
    }
    this.createVideos.controls['userId'].setValue(Number(this.user.id));
    this.videoServise.Insert(this.createVideos.value);
    this.createVideos.reset();
    this.dialog.closeAll();
  }

  UploadFile(typeFile: number, file: any) {
    if (file.length == 0) {
      return;
    }
    let fileToUploade = <File>file[0];
    const formData = new FormData();
    formData.append('file', fileToUploade);
    this.videoServise.uploadImage(typeFile, formData);
  }

  OpenDilaogEditVideo(data: any) {
    this.createVideos.controls['title'].setValue(data.title);
    this.createVideos.controls['userId'].setValue(Number(data.userId));
    this.createVideos.addControl(
      'oldposterPath',
      new FormControl(data.posterPath)
    );
    this.createVideos.addControl(
      'oldvideoPath',
      new FormControl(data.videoPath)
    );
    this.createVideos.addControl(
      'id',
      new FormControl<number>(Number(data.id))
    );
    this.dialog.open(this._EditVideosTemplate, {
      height: '405px',
      width: '600px',
    });
  }
  UpdateVideo() {
    if (!this.createVideos.valid) {
      this.createVideos.reset();
      this.dialog.closeAll();
    }
    this.videoServise.update(this.createVideos.value);
    this.dialog.closeAll();
    this.createVideos.reset();
  }

  DeleteVideo(data: any) {
    var valueConfirm = confirm('Ary you Sure .. ?');
    if (valueConfirm) {
      this.videoServise.delete(data);
      this.dialog.closeAll();
      window.location.reload();
    }
  }

  PromoteVideos(video: any) {
    this.shaerData._anyData = video;
    this.route.navigate(['/user/promote']);
  }
}
