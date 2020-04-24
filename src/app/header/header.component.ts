import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {Router} from '@angular/router';
import {User} from '../model/user';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  principal: User;

  constructor(public authenticationService: AuthenticationService,
              private router: Router,
              private userService: UserService) {
    this.authenticationService.onLogging.subscribe(() => {
        this.userService.getUserPrincipal().subscribe((principal) => {
          sessionStorage.setItem('principal', JSON.stringify(principal));
          this.principal = principal;
        });
      }
    );
  }

  ngOnInit(): void {
    this.principal = JSON.parse(sessionStorage.getItem('principal'));
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
    this.principal = null;
  }
}
