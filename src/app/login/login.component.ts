import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  operation: string;
  email: string = null;
  password: string = null;
  nickname: string = null;
  constructor(private authService: AuthService, private userService: UserService) {
    this.operation = 'login';
  }

  ngOnInit() {}

  login() {
    this.authService
      .loginWithEmail(this.email, this.password)
      .then(data => {
        alert('Sesion iniciada correctamente');
        console.log(data);
      })
      .catch(error => {
        alert('ERROR de conexión para login');
        console.log(error);
      });
  }


  signup() {
    this.authService
      .registerWithEmail(this.email, this.password)
      .then(data => {
        const user: User = {
          uid: data.user.uid,
          email: this.email,
          nick: this.nickname
        };
        this.userService.createUser(user)
        .then((userData) => {
          alert('Registro completo');
          console.log(userData);
        })
        .catch((error) => {
          alert('ERROR de conexión para registro');
          console.log(error);
        });
      })
      .catch(error => {
        alert('ERROR de conexión para registro');
        console.log(error);
      });
  }

}
