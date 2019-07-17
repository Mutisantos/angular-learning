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
  friend: User;
  score =  123.123456789;
  today: any = Date.now();
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {
    this.friendId = this.activatedRoute.snapshot.params['uid'];
    console.log(this.friendId);
    // Retreives friend data from the UserService that retrieves a single User using the URL retrieved UID
    this.userService.getUserById(this.friendId).valueChanges().subscribe(
      (data: User) => {console.log(data); this.friend = data; },
      (error) => {console.log(error); }
    );
    console.log(this.friend);
  }

  ngOnInit() {
  }
}
