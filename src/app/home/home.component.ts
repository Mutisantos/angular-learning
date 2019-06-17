import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
// tslint:disable:no-inferrable-types
// tslint:disable:prefer-const
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  friends: User[];
  myuser: User;
  // Define a variable that will be represented by an ngModel input
  query: string = '';
  constructor(private userService: UserService) {
    // this.typeExercise();
    // Get the friends data from a service instead of hard-codding it
    // this.friends = userService.getFriends();
    // this.myuser = userService.getMyUser();
  }

  typeExercise() {
    // Unfixed type variable
    let c = 1.0;
    let b = '2.0';
    // Defined type variables
    let aNumber: number = 12;
    let cString: string = '';
    let bulean: boolean = false;
    let objecto: object = {};
    // Unfixed type array
    let arregloMutable = [c, 'basd', 'c', 1.23, -1, false];
    // Fixed type array, it won't support other typed values
    let arregloEntero: number[] = [1, 2, 3, 4, 45];
    // Explicitly unfixed type array
    let arregloCualquiera: any[] = [aNumber, cString, bulean, objecto];
    console.log(arregloMutable);
  }

  ngOnInit() {}
}
