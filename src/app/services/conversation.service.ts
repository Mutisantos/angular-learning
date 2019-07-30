import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private firebaseDatabase: AngularFireDatabase) { 


  }


  createConversation(conversation) {
    return this.firebaseDatabase.object('conversations/' + conversation.uid + '/' + conversation.timestamp).set(conversation);
  }

  getConversations(conversationUid) {
    return this.firebaseDatabase.list('conversations/' + conversationUid);
  }

  editConversation(conversation) {
    return this.firebaseDatabase.object('conversations/' + conversation.uid + '/' + conversation.timestamp).set(conversation);
  }

}
