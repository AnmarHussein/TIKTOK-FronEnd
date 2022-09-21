import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/Service/auth.service';
import { DataService } from 'src/app/Service/data.service';
import { ProfileService } from 'src/app/Service/profile.service';
import { ReplayService } from 'src/app/Service/replay.service';

@Component({
  selector: 'app-commnet',
  templateUrl: './commnet.component.html',
  styleUrls: ['./commnet.component.css'],
})
export class CommnetComponent implements OnInit {
  vidoeId: any;
  userId: any;
  message: FormControl = new FormControl('');
  constructor(
    private replayServices: ReplayService,
    private shaerData: DataService,
    public profile: ProfileService,
    private jwtHelper: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.vidoeId = this.shaerData.anyData;
    this.userId = this.jwtHelper.decodeToken(
      localStorage.getItem('JWTToken')!
    ).id;
    this.profile.GetAllReplayVideo(this.vidoeId);
  }

  AddReplay() {
    let data: any = {
      message: this.message.value,
      userId: Number(this.userId),
      videoId: Number(this.vidoeId),
      imagePath: '',
      videoPath: '',
    };
    this.replayServices.Insert(data);
    this.message.reset();
  }
  UploadFile(file: any) {
    let typeFile;
    let extImage = ['png', 'jpeg', 'jpg'];
    let extvideo = ['mp4', 'mp3'];
    if (file.length == 0) {
      return;
    }
    let curentExtn = file[0].name.split('.').pop();
    if (extImage.indexOf(curentExtn) !== -1) {
      typeFile = 1;
    } else if (extvideo.indexOf(curentExtn) !== -1) {
      typeFile = 2;
    } else {
      return;
    }
    let fileToUploade = <File>file[0];
    const formData = new FormData();
    formData.append('file', fileToUploade);
    this.replayServices.uploadImage(typeFile, formData);
  }

  DeleteReplay(replay: any) {
    this.replayServices.delete(replay);
    window.location.reload();
  }
}
