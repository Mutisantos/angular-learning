import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { RequestService } from './services/request.service';
import { User } from './interfaces/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'platzinger';
  user: User;
  requests: any[] = [];
  mailsShow: any[] = [];
  constructor(public router: Router, private authService:AuthService, private userService: UserService,
              private requestService: RequestService) {
    this.authService.getStatus().subscribe((status)=>{
      this.userService.getUserById(status.uid).valueChanges().subscribe( (data: User) => { this.user = data; }
      );
    });
  }
}
