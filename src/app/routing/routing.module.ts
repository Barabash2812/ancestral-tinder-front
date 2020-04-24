import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {CardsComponent} from '../cards/cards.component';
import {AuthGuardModule} from '../auth-guard/auth-guard.module';
import {ProfileComponent} from '../profile/profile.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'cards', component: CardsComponent, canActivate: [AuthGuardModule]},
  {path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuardModule]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {
}
