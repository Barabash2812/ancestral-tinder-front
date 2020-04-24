import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {AbstractControl} from '@angular/forms';
import {AccessToken} from '../model/access.token';
import {SignUpRequest} from '../model/sign.up.request';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  @Output() onLogging = new EventEmitter();
  public currentAccessToken: Observable<AccessToken>;
  private currentAccessTokenSubject: BehaviorSubject<AccessToken>;

  constructor(private http: HttpClient) {
    this.currentAccessTokenSubject = new BehaviorSubject<AccessToken>(JSON.parse(localStorage.getItem('currentAccessToken')));
    this.currentAccessToken = this.currentAccessTokenSubject.asObservable();
  }

  private _isLoggedIn: boolean;

  public get isLoggedIn(): boolean {
    return this._isLoggedIn && !!this.currentAccessTokenSubject.value;
  }

  public set isLoggedIn(value) {
    this._isLoggedIn = value;
  }

  public get currentAccessTokenValue(): AccessToken {
    return this.currentAccessTokenSubject.value;
  }

  login(usernameOrEmail: AbstractControl, password: AbstractControl) {
    return this.http.post<any>(`${environment.apiUrl}/auth/signin`, {usernameOrEmail, password})
      .pipe(map(token => {
        localStorage.setItem('currentAccessToken', JSON.stringify(token));
        this.currentAccessTokenSubject.next(token);
        this.onLogging.emit();
        return token;
      }));
  }

  logout() {
    sessionStorage.removeItem('principal');
    sessionStorage.removeItem('profile');
    localStorage.removeItem('currentAccessToken');
    this.currentAccessTokenSubject.next(null);
  }

  validateToken(token: AccessToken): Observable<boolean> {
    const value = token.accessToken;
    return this.http.post<any>(`${environment.apiUrl}/auth/validate`, {value}).pipe(
      map(isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
        return isLoggedIn;
      })
    );
  }

  registrate(signUpRequest: SignUpRequest) {
    return this.http.post<any>(`${environment.apiUrl}/auth/signup`, signUpRequest);
  }
}
