import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router, CanLoad, Route} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {JwtHelper} from 'angular2-jwt';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private router: Router) {
  }

  useJwtHelper(): boolean {
    const token = localStorage.getItem('token');
    if (token === null || this.jwtHelper.isTokenExpired(token)) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.useJwtHelper();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.useJwtHelper();
  }
}
