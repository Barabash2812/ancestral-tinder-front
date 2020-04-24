import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {CardsComponent} from './cards/cards.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ClrFormsModule, ClrIconModule, ClrModalModule} from '@clr/angular';
import {RoutingModule} from './routing/routing.module';
import {JwtInterceptor} from './helpers/jwt.interceptor';
import {HeaderComponent} from './header/header.component';
import {ProfileComponent} from './profile/profile.component';
import {LoversComponent} from './profile/lovers/lovers.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    LoginComponent,
    HeaderComponent,
    ProfileComponent,
    LoversComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    ClrFormsModule,
    RoutingModule,
    ClrIconModule,
    ClrModalModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
