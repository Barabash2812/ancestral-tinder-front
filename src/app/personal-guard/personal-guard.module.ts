import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../service/user.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PersonalGuardModule implements CanActivateChild {

  constructor(private userService: UserService) {
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const id = parseInt(route.paramMap.get('id'), 10);
    return this.userService.getUserPrincipal().pipe(map((principal) => {
      if (principal) {
        return principal.id === id;
      }
    }));
  }

}
