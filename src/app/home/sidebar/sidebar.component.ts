import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { AuthService } from 'src/app/Service/auth.service';
import { HomepageService } from 'src/app/Service/homepage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    public auth: AuthService,
    public home: HomepageService,
    private jwtHelper: JwtHelperService,
  ) {}

  ngOnInit(): void {
    this.home.GetHomePage();
    this.home.GetLik1();
    let token = this.auth.GetUserToken();
    if (token) {
      this.home.GetSuggestUser({ id: Number(token.id) });
    } else {
      this.home.GetSuggestUser({ id: 0 });
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
}
