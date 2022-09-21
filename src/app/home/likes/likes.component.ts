import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Service/auth.service';
import { BehaviorSubject } from 'rxjs';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { LikeService } from 'src/app/Service/like.service';
@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css'],
})
export class LikesComponent implements OnInit {
  @Input() countLike?: any;
  @Input() videoid?: any;
  @Input() LikeInVideo?: any;
  constructor(
    public auth: AuthService,
    private likeServes: LikeService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.auth.isUserAuthntication()) {
      let userId = Number(this.auth.GetUserToken().id);
    }
  }

  OpenLoginForm() {
    const dila = this.dialog.open(LoginComponent, {
      width: '500px',
      height: '534px',
      panelClass: 'hidden-dialog',
      position: { top: '20px' },
    });
  }
  AddLike() {
    let userId = Number(this.auth.GetUserToken().id);
    if (this.LikeInVideo === 0) {
      document.getElementById('iconId')?.classList.add('colo-red');
      this.countLike++;
      this.likeServes.InserLike({ userId: userId, videoid: this.videoid });
      this.LikeInVideo = 1;
    } else if (this.LikeInVideo === 1) {
      document.getElementById('iconId')?.classList.remove('colo-red');
      this.countLike--;
      this.likeServes.DeleteLike({ userid: userId, videoid: this.videoid });
      this.LikeInVideo = 0;
    }
  }
}
