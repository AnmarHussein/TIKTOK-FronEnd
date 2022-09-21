import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { AuthService } from 'src/app/Service/auth.service';
import { HomepageService } from 'src/app/Service/homepage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    public auth: AuthService,
    public home: HomepageService,
    private jwtHelper: JwtHelperService
  ) {}

  ngOnInit(): void {
    
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
