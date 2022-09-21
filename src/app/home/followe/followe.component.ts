import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { AuthService } from 'src/app/Service/auth.service';
import { LikeService } from 'src/app/Service/like.service';

@Component({
  selector: 'app-followe',
  templateUrl: './followe.component.html',
  styleUrls: ['./followe.component.css'],
})
export class FolloweComponent implements OnInit {
  @Input() followBack: any;
  @Input() userId: any;
  curentUserId: any;
  constructor(
    public auth: AuthService,
    private likeServes: LikeService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.auth.isUserAuthntication()) {
      this.curentUserId = Number(this.auth.GetUserToken().id);
      if (this.curentUserId == this.followBack) {
        this.followBack = 1;
      }
    }
  }

  AddFollow() {
    this.followBack = 1;
    this.likeServes.InsertFollower({
      userId: this.userId,
      followed: this.curentUserId,
    });
  }

  ShowLoginForm() {
    const dila = this.dialog.open(LoginComponent, {
      width: '500px',
      height: '534px',
      panelClass: 'hidden-dialog',
      position: { top: '20px' },
    });
  }
}
