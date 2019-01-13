import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

// Created with the command ng generate service services/user
//Service used to allocate the information used in Home and Conversation Component
//Decouples the data source providing a consumable service
@Injectable({
  providedIn: 'root'
})
export class UserService {
  friends: User[];
  myuser: User;
  constructor() { 
    let meuser: User = {
      nick: 'muti',
      age: 25,
      email: 'mutisantos@gmail.com',
      uid: '99'
    };

    this.myuser = meuser;

    let usuario1: User = {
      nick: 'Pengralle',
      age: 24,
      email: 'pen@aoe.aoe',
      logged: true,
      uid: 1
    };
    let usuario2: User = {
      nick: 'Flamrose',
      age: 28,
      email: 'flam@aoe.aoe',
      logged: true,
      uid: 2
    };
    let usuario3: User = {
      nick: 'Piedra',
      age: 18,
      email: 'Stone@aoe.aoe',
      logged: true,
      uid: 3
    };
    let usuario4: User = {
      nick: 'cosin',
      age: 17,
      email: 'cosito@aoe.aoe',
      logged: false,
      uid: 4
    };
    let usuario5: User = {
      nick: 'Slime',
      age: 30,
      email: 'babas@aoe.aoe',
      logged: false,
      uid: 5
    };
    this.friends = [];
    this.friends.push(usuario1, usuario2, usuario3, usuario4, usuario5);
  }

  getFriends(){
    return this.friends;
  }

  getMyUser(){
    return this.myuser;
  }

}
