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
  // Inject the angular fire database for query operations in the database
  constructor(private angularFireDatabase: AngularFireDatabase) {
  }

  // Connects to Firebase and retrieve all the content within the node /Platzinger/users/ (JSON urls) as a Observable Object
  getUsers() {
    return this.angularFireDatabase.list('/users');
  }

  // Connects to Firebase and retrieve all the content within the node /Platzinger/users/ given an UID that should fit with the search
  getUserById(uid) {
    return this.angularFireDatabase.object('/users/' + uid);
  }

  // Creates a new user given its UID. Retrives the unexisting user and creates its registry
  createUser(user: User) {
    return this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }

  // Same as createUser. Since the user should be already existing in the DB, it will overwrite its current information
  updateUser(user: User) {
    return this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }

}
