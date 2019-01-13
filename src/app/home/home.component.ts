import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  friends: User[];
  myuser: User;

  constructor() {
    // this.typeExercise();
    const myuser: User = {
      nick: 'muti',
      age: 25,
      email: 'mutisantos@gmail.com',
      uid: '99'
    };

    const f1: User = {
      nick: 'AAA',
      age: 25,
      email: 'asdasd@gmail.com',
      uid: '3'
    };
    const f2: User = {
      nick: '2311',
      age: 25,
      email: '21313@gmail.com',
      uid: '2',
      logged: false
    };
    const f3: User = {
      nick: 'mmmm',
      age: 25,
      email: 'mmmm@gmail.com',
      uid: '1',
      logged: true
    };
    this.friends = [];
    this.friends.push(f1, f2, f3);
    this.myuser = myuser;
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
    let arragloCualquiera: any[] = [aNumber, cString, bulean, objecto];
    console.log(arregloMutable);
  }

  ngOnInit() {}
}
