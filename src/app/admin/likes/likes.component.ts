import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataService } from 'src/app/Service/data.service';
import { ProfileService } from 'src/app/Service/profile.service';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css'],
})
export class LikesComponent implements OnInit {
  vidoeId: any;
  constructor(
    private shaerData: DataService,
    public profile: ProfileService,
    private jwtHelper: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.vidoeId = this.shaerData.anyData;
    this.profile.GetAllLikeVideo(this.vidoeId);
  }
}
