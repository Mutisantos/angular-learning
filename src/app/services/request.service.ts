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
    // An email could have more than one request, therefore, using a '/', the elements are allocated as a list in a folder
    return this.angularFireData.object('requests/' + cleanEmail + '/' + request.sender).set(request);
  }


  setRequestStatus(request, status) {
    const cleanEmail = request.receiverEmail.replace('.', ',');
    // Update the request status accordingly
    return this.angularFireData.object('requests/' + cleanEmail + '/' + request.sender + '/status').set(status);
  }

  // Get all the requests given a certain email
  getRequestForEmail(email) {
    const cleanEmail = email.replace('.', ',');
    const requestList = this.angularFireData.object('requests/' + cleanEmail);
    return requestList;
  }
}
