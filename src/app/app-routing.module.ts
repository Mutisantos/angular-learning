import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
    // canActivate: [
    //   AuthGuard
    // ],
  },
  {
    path: 'home',
    component: HomeComponent
    // canActivate: [
    //   AuthGuard
    // ],
    // data: {
    //   allowedRoles: ['logged']
    // }
  },
  {
    path: 'conversation/:uid',
    component: ConversationComponent
    // canActivate: [
    //   AuthGuard
    // ],
    // data: {
    //   allowedRoles: ['logged']
    // }
  },
  {
    path: 'profile',
    component: ProfileComponent
    // data:{
    //   allowedRoles:['logged']
    // }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
