import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Service/data.service';
import { ProfileService } from 'src/app/Service/profile.service';
import { CommnetComponent } from '../../commnet/commnet.component';
import { LikesComponent } from '../../likes/likes.component';

@Component({
  selector: 'app-prfile-users',
  templateUrl: './prfile-users.component.html',
  styleUrls: ['./prfile-users.component.css'],
})
export class PrfileUsersComponent implements OnInit, OnDestroy {
  userInfo: any;
  constructor(
    public profile: ProfileService,
    private router: Router,
    public dataSharing: DataService,
    private dialog: MatDialog
  ) {}
  ngOnDestroy(): void {
    this.dataSharing.anyData = null;
  }

  ngOnInit(): void {
    this.userInfo = this.dataSharing.anyData;
    if (this.userInfo == null) {
      this.router.navigate(['/admin/users']);
    } else {
      this.profile.GetAllFollowers(this.userInfo);
      this.profile.GetAllFollowing(this.userInfo);
      this.profile.GetAllVideoAndCount(this.userInfo);
    }
  }

  OpenDialogComment(videoid: any) {
    this.dialog.open(CommnetComponent, {
      position: { top: '100px', left: '400px' },
      width: '700px',
      height: '500px',
    });
    this.dataSharing.anyData = videoid;
  }
  OpenDialogLikes(videoid: any) {
    this.dialog.open(LikesComponent, {
      position: { top: '100px', left: '400px' },
      width: '700px',
      height: '500px',
    });
    this.dataSharing.anyData = videoid;
  }
}
