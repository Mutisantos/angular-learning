import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { AngularFireDatabase } from '@angular/fire/database';

// Created with the command ng generate service services/user
// Service used to allocate the information used in Home and Conversation Component
// Decouples the data source providing a consumable service
@Injectable({
  providedIn: 'root'
})
export class UserService {
  // friends: User[];
  // myuser: User;
  constructor(private angularFireDatabase: AngularFireDatabase) {
  }

  getUsers() {
    return this.angularFireDatabase.list('/users');
  }

  getUserById(uid) {
    return this.angularFireDatabase.object('/users/' + uid);
  }

  createUser(user: User) {
    return this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }

  updateUser(user: User) {
    return this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }

}
