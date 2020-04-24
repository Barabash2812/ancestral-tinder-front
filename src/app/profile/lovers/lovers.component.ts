import {Component, OnInit} from '@angular/core';
import {Profile} from '../../model/profile';
import {ProfileService} from '../../service/profile.service';

@Component({
  selector: 'app-lovers',
  templateUrl: './lovers.component.html',
  styleUrls: ['./lovers.component.css']
})
export class LoversComponent implements OnInit {
  lovers: Profile[];

  constructor(private profileService: ProfileService) {
  }

  ngOnInit(): void {
    this.getLovers();
  }

  getLovers() {
    this.profileService.getLovers().subscribe((lovers) => {
      lovers.forEach((lover) => {
        this.checkMatch(lover);
      });
      this.lovers = lovers;
    });
  }

  removeLover(lover: Profile) {
    this.profileService.removeLoverById(lover.id).subscribe(() => {
      this.getLovers();
    });
  }

  checkMatch(lover: Profile) {
    this.profileService.checkMatch(lover.id).subscribe((isMatch) => {
      lover.match = isMatch;
    });
  }
}
