import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CommnetComponent } from 'src/app/admin/commnet/commnet.component';
import { AuthService } from 'src/app/Service/auth.service';
import { DataService } from 'src/app/Service/data.service';
import { HomepageService } from 'src/app/Service/homepage.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {
  constructor(
    private shearData: DataService,
    public auth: AuthService,
    public home: HomepageService,
    private route: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    let userid = Number(localStorage.getItem('idPage')!);
    if (userid && this.auth.isUserAuthntication()) {
      let curentId = this.auth.GetUserToken().id;
      this.home.GetUserToPage({
        userId: userid,
        userCurentId: Number(curentId),
      });
      this.home.GetVideoToPage({
        userId: userid,
        userCurentId: Number(curentId),
      });
    } else if (userid) {
      this.home.GetUserToPage({ userId: userid, userCurentId: 0 });
      this.home.GetVideoToPage({ userId: userid, userCurentId: 0 });
    } else {
      this.route.navigate(['/home']);
    }
  }

  OpenDialogComment(videoid: any) {
    this.dialog.open(CommnetComponent, {
      position: { top: '100px', left: '400px' },
      width: '700px',
      height: '500px',
    });
    this.shearData.anyData = videoid;
  }
}
