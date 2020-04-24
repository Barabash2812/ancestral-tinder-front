import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Profile} from '../model/profile';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  private profileUrl = `${environment.apiUrl}/profile`;

  constructor(private http: HttpClient) {
  }

  getNextProfile() {
    const url = `${this.profileUrl}/next`;
    return this.http.get<Profile>(url);
  }

  addLover(current: Profile) {
    const url = `${this.profileUrl}/like`;
    return this.http.post<boolean>(url, current);
  }

  initProfileSupplier() {
    const url = `${this.profileUrl}/init`;
    return this.http.post(url, {});
  }
}
