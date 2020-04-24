import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProfileService} from '../service/profile.service';
import {Profile} from '../model/profile';
import {UserService} from '../service/user.service';
import {ProfileDto} from '../model/profile.dto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('lovers') loversComponent;
  profileId: number;
  profile: Profile;
  haveAccess: boolean;
  modalOpened = false;
  profileDto: ProfileDto;

  constructor(private route: ActivatedRoute,
              private profileService: ProfileService,
              private userService: UserService) {
    this.route.params.subscribe((params) => {
      this.profileId = parseInt(params['id'], 10);
      this.getProfile();
    });
    this.profileDto = new ProfileDto(null, null, null, null);
  }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.profileService.getProfileById(this.profileId).subscribe((profile) => {
      this.profile = profile;
      this.checkIfCanShow();
    });
  }

  checkIfCanShow() {
    this.userService.getUserPrincipal().subscribe((principal) => {
      if (principal) {
        this.haveAccess = principal.id === this.profileId;
      }
    });
  }

  updateProfile() {
    this.profileDto.recover(this.profile);
    if (this.profileDto.sex !== this.profile.sex) {
      this.loversComponent.lovers.forEach((lover) => {
        this.loversComponent.removeLover(lover);
      });
    }
    this.profileService.updateProfileByDto(this.profileDto).subscribe(() => {
      this.getProfile();
    });
  }

  openModal() {
    this.modalOpened = true;
    setTimeout(() => {
      const ele = document.getElementsByClassName('modal')[0];
      ele.classList.remove('modal');
      ele.setAttribute('style', `  position: fixed;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          z-index: 500;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 2.4rem;`);
    }, 100);
  }
}

