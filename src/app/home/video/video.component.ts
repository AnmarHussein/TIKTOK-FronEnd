import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { CommnetComponent } from 'src/app/admin/commnet/commnet.component';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { AuthService } from 'src/app/Service/auth.service';
import { DataService } from 'src/app/Service/data.service';
import { HomepageService } from 'src/app/Service/homepage.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent implements OnInit {
  constructor(
    public auth: AuthService,
    public home: HomepageService,
    private shearData: DataService,
    private dialog: MatDialog,
    private route: Router
  ) {}

  ngOnInit(): void {
    let token = this.auth.GetUserToken();

    if (token) {
      console.log(token.id);
      this.home.GetAllVideoHome({ id: Number(token.id) });
    } else {
      this.home.GetAllVideoHome({});
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

  OpenLoginForm() {
    const dila = this.dialog.open(LoginComponent, {
      width: '500px',
      height: '534px',
      panelClass: 'hidden-dialog',
      position: { top: '20px' },
    });
  }

  ShowUserPage(userId: any) {
    localStorage.setItem('idPage', userId);
    this.route.navigate(['/home/userPage']);
  }
}
