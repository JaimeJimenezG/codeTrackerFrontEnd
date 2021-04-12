import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Resolve } from '@angular/router';
import { CardsComponent } from "./cards/cards.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuardService } from "./service/auth-guard.service";
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '',
    component: LoginComponent
  },
  {
    path: 'projects',
    component: CardsComponent,
    canActivate: [AuthGuardService] 
  },
  {
    path: ':id',
    component: UserComponent,
    canActivate: [AuthGuardService] 
  },
  { path: '**', redirectTo: '' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
