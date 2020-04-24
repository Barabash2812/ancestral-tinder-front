import {Component, OnInit} from '@angular/core';
import {Profile} from '../model/profile';
import {CardsService} from '../service/cards.service';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  currentProfile: Profile;
  message: string;
  isNotStarted = true;

  constructor(private cardsService: CardsService, private userService: UserService) {
    this.init();
  }

  ngOnInit(): void {
    this.init();
    this.refresh();
  }

  refresh() {
    this.currentProfile = JSON.parse(sessionStorage.getItem('profile'));
  }

  init() {
    this.cardsService.initProfileSupplier().subscribe(() => {
      this.nextProfile();
    });
  }


  nextProfile() {
    this.cardsService.getNextProfile().subscribe((profile) => {
      if (!profile) {
        this.message = 'CARDS ENDS!';
      }
      sessionStorage.setItem('profile', JSON.stringify(profile));
      this.refresh();
    });
  }

  like() {
    this.cardsService.addLover(this.currentProfile).subscribe(
      (isMatch) => {
        this.userService.getUserPrincipal().subscribe((principal) => {
          if (isMatch) {
            this.showMessage('You are loved. Be happy ' + principal.profile.name + ' and ' + this.currentProfile.name + '!');
          }
          this.nextProfile();
        });
      });
    this.isNotStarted = false;
  }

  unlike() {
    this.nextProfile();
    this.isNotStarted = false;
  }

  showMessage(msg: string) {
    this.message = msg;
    setTimeout(() => {
      this.message = null;
    }, 3000);
  }
}
