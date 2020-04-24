import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Profile} from '../model/profile';
import {ProfileDto} from '../model/profile.dto';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profileUrl = `${environment.apiUrl}/profile`;

  constructor(private http: HttpClient) {
  }

  getProfileById(id: number) {
    const url = `${this.profileUrl}/${id}`;
    return this.http.get<Profile>(url);
  }

  getLovers() {
    const url = `${this.profileUrl}/lovers`;
    return this.http.get<Profile[]>(url);
  }

  removeLoverById(id: number) {
    const url = `${this.profileUrl}/lovers/${id}`;
    return this.http.delete(url);
  }

  updateProfileByDto(profileDto: ProfileDto) {
    return this.http.put(this.profileUrl, profileDto);
  }

  checkMatch(id: number) {
    const url = `${this.profileUrl}/lovers/${id}/check`;
    return this.http.get<boolean>(url);
  }
}
