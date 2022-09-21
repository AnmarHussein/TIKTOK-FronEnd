import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProfileService } from 'src/app/Service/profile.service';
import { UserProfileService } from 'src/app/Service/user-profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userInfo: any;
  constructor(
    private jwtHelper: JwtHelperService,
    public userProfile: UserProfileService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.userInfo = this.jwtHelper.decodeToken(
      localStorage.getItem('JWTToken')!
    );
    if (!this.userInfo) {
      this.route.navigate(['/home']);
    }
    this.userProfile.GetAllUserCountStatistic(this.userInfo);

    
  }
}
