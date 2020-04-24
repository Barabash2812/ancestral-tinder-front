import {Component, OnInit} from '@angular/core';
import {CardsComponent} from './cards/cards.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CardsComponent]
})
export class AppComponent implements OnInit {
  title = 'ancestral-tinder';

  constructor() {
  }

  ngOnInit(): void {
  }
}



