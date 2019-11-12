import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {RequestService} from '../../services/request.service';
import { DialogService, DialogComponent } from 'ng2-bootstrap-modal';

export interface PromptModel {
  scope: any;
  currentRequest: any;
}
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.sass']
})
export class RequestComponent extends DialogComponent<PromptModel, any> implements PromptModel {
  scope: any;
  currentRequest: any;
  shouldAdd: 'yes';
  constructor(public dialogService: DialogService, private userService: UserService, private requestsService: RequestService) {
    super(dialogService);
  }

  setCurrentRequest(scope, request) {
    this.scope = scope;
    this.currentRequest = request;
  }

  accept() { // Operate the request based on the option selected by the user
    if (this.shouldAdd === 'yes') {
      this.requestsService.setRequestStatus(this.currentRequest, 'accepted').then((data) => {
        console.log(data);
        this.userService.addFriend(this.scope.user.uid, this.currentRequest.sender).then(() => {
          alert('Solicitud aceptada con éxito');
        });
      }).catch((error) => {
        console.log(error);
      });
    } else if (this.shouldAdd === 'no') {
      this.requestsService.setRequestStatus(this.currentRequest, 'rejected').then((data) => {
        console.log(data);
      }).catch((error) => {
        console.log(error);
      });
    } else if (this.shouldAdd === 'later') {
      this.requestsService.setRequestStatus(this.currentRequest, 'decide_later').then((data) => {
        console.log(data);
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  close() {
  }

}
