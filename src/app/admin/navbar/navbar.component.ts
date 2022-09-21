import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: any;
  constructor(private route: Router, private jwtHelper: JwtHelperService) {}

  ngOnInit(): void {
    this.user = this.jwtHelper.decodeToken(localStorage.getItem('JWTToken')!);
  }

  LogOut() {
    localStorage.removeItem('JWTToken');
    this.route.navigate(['/home']);
  }
}
