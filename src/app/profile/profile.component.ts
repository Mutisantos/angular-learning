import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  // Using ngModel, the user will be reflected on the form values
  myuser: User;
  constructor(private userService: UserService, private authService: AuthService) {
    this.authService.getStatus().subscribe(
      (status) => {this.userService.getUserById(status.uid).valueChanges()
          .subscribe(
            (data: User) => {this.myuser = data ; console.log(this.myuser); },
            (staterror) => {console.log(staterror); }
          ) ;
        } ,
      (error) => {console.log(error); }
     );

  }

  ngOnInit() {
  }

  // When the update is triggered, the component will get all the ngModel values and overwrite the reference
  updateProfile() {
    this.userService.updateUser(this.myuser).then(
      () => {alert('Perfil actualizado correctamente'); }
    ).catch(
      (error) => {alert('Ocurrio un error al guardar'); console.log(error); }
    );
  }

}
