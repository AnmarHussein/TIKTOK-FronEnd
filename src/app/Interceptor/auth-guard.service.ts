import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService,
    private toster: ToastrService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const token = localStorage.getItem('JWTToken');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      let role = this.jwtHelper.decodeToken(token)!.Role;
      if (state.url.indexOf('admin') == 1 && role == 'Admin') {
        this.toster.success('Welcom To Admin Page');
        return true;
      } else if (state.url.indexOf('user') >= 0 && role == 'User') {
        this.toster.success('Welcom To User Page');
        return true;
      } else {
        this.toster.error('Cant Show This Page ');
        localStorage.removeItem('JWTToken');
        this.router.navigate(['/home']);
        return false;
      }
    }
    this.toster.error('Cant Show This Page ');
    localStorage.removeItem('JWTToken');
    this.router.navigate(['/home']);
    return false;
  }
}
