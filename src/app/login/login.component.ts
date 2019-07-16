import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
    this.operation = 'login';
  }

  ngOnInit() {}

  // Use the Firebase based authentication services for logging in
  login() {
    this.authService
      .loginWithEmail(this.email, this.password)
      .then(data => {
        alert('Sesión iniciada correctamente');
        console.log(data);
        // Once the login was successful, navigate to home
        this.router.navigate(['home']);
      })
      // Error handling must always be done
      .catch(error => {
        alert('ERROR de conexión para el inicio de sesión');
        console.log(error);
      });
  }

// Use the Firebase based authentication for registring in the application
  signup() {
    this.authService
      .registerWithEmail(this.email, this.password)
      // When the register is started, create the User object
      .then(data => {
        const user: User = {
          uid: data.user.uid,
          email: this.email,
          nick: this.nickname
        };
        // Once the user was created in firebase, throw the alert
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
