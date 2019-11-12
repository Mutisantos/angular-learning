import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { RequestService } from './services/request.service';
import { User } from './interfaces/user';
import { RequestComponent } from './modals/request/request.component';
import { DialogService } from 'ng2-bootstrap-modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'platzinger';
  // The requests must be located globally, then they are on the AppComponent
  user: User;
  requests: any[] = [];
  mailsShow: any[] = [];
  constructor(
    public router: Router,
    private authService: AuthService,
    private userService: UserService,
    private requestService: RequestService,
    private requestComponent: RequestComponent,
    private dialogService: DialogService
  ) {
    this.authService.getStatus().subscribe(status => {
      this.userService
        .getUserById(status.uid)
        .valueChanges()
        .subscribe((data: User) => {
          this.user = data;
          this.requestService.getRequestForEmail(this.user.email).valueChanges().subscribe(
            (requests: any[]) => {
              this.requests = Object.entries(requests);
              // filter requests
              this.requests = this.requests.filter( (r) => {
                return r[1].status !== 'accepted' && r[1].status !== 'rejected';
              });
              this.requests.forEach((r) => {
                if (this.mailsShow.indexOf(r.sender) === -1) {
                  console.log(r.sender);
                  console.log(r[0]);
                  console.log(r[1]);
                  this.mailsShow.push(r[1].senderEmail);
                  this.dialogService.addDialog(RequestComponent, {scope: this, currentRequest: r[1]});
                  this.requestComponent.setCurrentRequest(this, r);
                }
              });
            },
            (error) => {
              console.log(error);
            }
          );
        });
    });
  }
}
