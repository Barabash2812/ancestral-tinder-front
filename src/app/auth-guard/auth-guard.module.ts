import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {map} from 'rxjs/operators';
import {AuthenticationService} from '../service/authentication.service';

@Injectable({providedIn: 'root'})
export class AuthGuardModule implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentAccessToken = this.authenticationService.currentAccessTokenValue;
    if (currentAccessToken) {
      return this.authenticationService.validateToken(currentAccessToken)
        .pipe(
          map(data => {
            if (data) {
              return true;
            }
          }));
    } else {
      this.router.navigate(['/login']).then(() => false);
      return false;
    }
  }
}
