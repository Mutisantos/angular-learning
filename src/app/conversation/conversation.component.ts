import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.sass']
})
export class ConversationComponent implements OnInit {
  friendid: any;
  constructor(private activedRoute: ActivatedRoute) {
    this.friendid = this.activedRoute.snapshot.params['uid'];
    console.log(this.friendid);
  }

  ngOnInit() {}
}
