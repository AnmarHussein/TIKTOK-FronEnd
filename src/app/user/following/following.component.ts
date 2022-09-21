import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserProfileService } from 'src/app/Service/user-profile.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css'],
})
export class FollowingComponent implements OnInit {
  user: any;
  constructor(
    private jwtHellper: JwtHelperService,
    public userProfile: UserProfileService
  ) {}

  ngOnInit(): void {
    this.user = this.jwtHellper.decodeToken(localStorage.getItem('JWTToken')!);
    this.userProfile.GetAllFollwingBlock(this.user);
  }
  AddFollowe(followe: any) {
    console.log(followe);
  }
  
  DeletFollowe(followe: any) {
    this.userProfile.DeleteFollower(followe);
  }
  AddBlockUser(following: any) {
    let data = {
      block1User: following.userId,
      userId: following.followed,
    };
    this.userProfile.AddBlockUser(data);
  }
  DeleteBlockUser(following: any) {
    this.userProfile.RemoveBlock(following);
  }
}
