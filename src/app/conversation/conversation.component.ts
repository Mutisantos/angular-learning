import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.sass']
})
export class ConversationComponent implements OnInit {

  friendId: any;
  friends: User[];
  friend: User;
  score: number = 123.145377;
  today: any = Date.now();
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {
    this.friendId = this.activatedRoute.snapshot.params['uid'];
    console.log(this.friendId);
    //Retreives friend data from the Service instead of hardcoding it.
    this.friends = userService.getFriends();
    
    this.friend = this.friends.find((record) =>{
      return record.uid == this.friendId;
    });
  }

  ngOnInit() {
  }

}