import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private angularFireAuth: AngularFireAuth) {}

  // Use the AngularFire package to login an existing user
  loginWithEmail(email: string, password: string) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  // Use the AngularFire package to link Angular with Firebase Auth DB for creating a user
  registerWithEmail(email: string, password: string) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  // registerWithEmail(email: string, password: string, nickname: string) {
  //   return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  // }


  //Observable that will return any change from the User Session
  getStatus() {
    return this.angularFireAuth.authState;
  }

  //Ends the users session as a Promise
  logOut() {
    return this.angularFireAuth.auth.signOut();
  }
}
