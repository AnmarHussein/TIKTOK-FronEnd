import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: any;
  constructor(private jwtHellper: JwtHelperService) {}

  ngOnInit(): void {
    this.user = this.jwtHellper.decodeToken(localStorage.getItem('JWTToken')!);
  }
}
