import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserProfileService } from 'src/app/Service/user-profile.service';

@Component({
  selector: 'app-follower',
  templateUrl: './follower.component.html',
  styleUrls: ['./follower.component.css'],
})
export class FollowerComponent implements OnInit {
  user: any;
  constructor(
    private jwtHellper: JwtHelperService,
    public userProfile: UserProfileService
  ) {}

  ngOnInit(): void {
    this.user = this.jwtHellper.decodeToken(localStorage.getItem('JWTToken')!);
    this.userProfile.GetAllFollwerBlock(this.user);
  }

  AddFollowe(followe: any) {
    console.log(followe);
  }
  DeletFollowe(followe: any) {
    this.userProfile.DeleteFollower(followe);
  }
}
