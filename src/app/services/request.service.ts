import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private angularFireData: AngularFireDatabase) { }

  createFriendRequest(request){
    // routes with . characters cannot be handled in the firebaseDB, since . is reserved for setting attributes
    const cleanEmail = request.receiverEmail.replace('.', ',');
    return this.angularFireData.object('requests/' + cleanEmail + '/' + request.senderEmail).set(request);
  }


  setRequestStatus(request, status) {
    const cleanEmail = request.receiverEmail.replace('.', ',');
    return this.angularFireData.object('requests/' + cleanEmail + '/' + request.senderEmail).set(status);
  }


  getRequestForEmail(email) {
    const cleanEmail = email.receiverEmail.replace('.', ',');
    return this.angularFireData.object('requests/' + cleanEmail);
  }
}
