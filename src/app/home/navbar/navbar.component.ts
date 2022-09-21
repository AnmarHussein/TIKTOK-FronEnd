import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { AuthService } from 'src/app/Service/auth.service';
import { HomepageService } from 'src/app/Service/homepage.service';
import { CreateLiveComponent } from '../create-live/create-live.component';
import { HomepageComponent } from '../homepage/homepage.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: any;
  constructor(
    public authServes: AuthService,
    public dialog: MatDialog,
    public home: HomepageService
  ) {}

  ngOnInit(): void {
    this.home.GetHomePage();
    this.home.GetLik1();

    if (this.authServes.isUserAuthntication()) {
      this.user = this.authServes.GetUserToken();
    }
  }

  ShowLoginForm() {
    const dila = this.dialog.open(LoginComponent, {
      width: '500px',
      height: '534px',
      panelClass: 'hidden-dialog',
      position: { top: '20px' },
    });
  }
  ShowCreateLive() {
    const dila = this.dialog.open(CreateLiveComponent, {
      width: '500px',
      height: '534px',
      panelClass: 'hidden-dialog',
      position: { top: '20px' },
    });
  }
}
