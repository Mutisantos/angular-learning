import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { ConversationService } from '../services/conversation.service';
import { AuthService } from '../services/auth.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { text } from '@angular/core/src/render3';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  friendId: any;
  friend: User;
  myuser: User;
  conversationId: string;
  score = 123.123456789;
  today: any = Date.now();
  message: string;
  conversationLog: any[];
  shake: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private conversationService: ConversationService,
    private authService: AuthService
  ) {
    this.friendId = this.activatedRoute.snapshot.params['uid'];
    console.log(this.friendId);
    // Retreives friend data from the UserService that retrieves a single User using the URL retrieved UID

    console.log(this.friend);
    this.authService.getStatus().subscribe(
      session => {
        this.userService
          .getUserById(session.uid)
          .valueChanges()
          .subscribe(
            (data: User) => {
              this.myuser = data;
              console.log(this.myuser);
            },
            staterror => {
              console.log(staterror);
            }
          );
        this.userService
          .getUserById(this.friendId)
          .valueChanges()
          .subscribe(
            (data: User) => {
              console.log(data);
              this.friend = data;
              // Use both Ids in order to create a UUID for the conversation based on those involved in it
              const uids = [this.myuser.uid, this.friendId].sort();
              // A join array will concatenate all the values with a separation character
              this.conversationId = uids.join('|');
              this.getConversation();
            },
            error => {
              console.log(error);
            }
          );
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {}

  sendMessage() {
    const newMessage = {
      uid: this.conversationId,
      timestamp: Date.now(),
      text: this.message,
      sender: this.myuser.uid,
      receiver: this.friend.uid,
      type: 'text'
    };
    // Send the message and resolve the incoming promise
    this.conversationService.createConversation(newMessage).then(
      () => {
        this.message = '';
      },
      error => {
        console.log(error);
      }
    );
  }

  sendBuzz() {
    const newMessage = {
      uid: this.conversationId,
      timestamp: Date.now(),
      text: null,
      sender: this.myuser.uid,
      receiver: this.friend.uid,
      type: 'buzz'
    };
    // Send the message and resolve the incoming promise
    this.conversationService.createConversation(newMessage).then(
      () => {},
      error => {
        console.log(error);
      }
    );
    this.doBuzz();
  }

  doBuzz() {
    const audio = new Audio ('assets/sound/zumbido.m4a');
    audio.play();
    this.shake = true;
    window.setTimeout(() => {this.shake = false; }, 1500);
  }

  getConversation() {
    this.conversationService
      .getConversations(this.conversationId)
      .valueChanges()
      .subscribe(
        data => {
          console.log(data);
          this.conversationLog = data;
          this.conversationLog.forEach((message) => {
            if (!message.seen && message.type !== 'buzz') {
              message.seen = true;
              this.conversationService.editConversation(message);
              const audio = new Audio ('assets/sound/new_message.m4a');
              audio.play();
            }
          }
          );
        },
        error => {
          console.log(error);
        }
      );
  }

  getUserNickById(uid) {
    if (uid === this.friend.uid) {
      return this.friend.nick;
    } else {
      return this.myuser.nick;
    }
  }
}
