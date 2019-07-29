import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  // Using ngModel, the user will be reflected on the form values
  myuser: User;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  picture: any;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private firebaseStorage: AngularFireStorage
  ) {
    this.authService.getStatus().subscribe(
      status => {
        this.userService
          .getUserById(status.uid)
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
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {}

  // When the update is triggered, the component will get all the ngModel values and overwrite the reference
  updateProfile() {
    if (this.croppedImage) {
      // Create an Image ID based on the uploading date in miliseconds
      const currentPictureId = Date.now();
      // References nodes in the firebase storage (instead of the database) to allocate the file.
      // Later, it will receive the compressed image in base64 format
      const pictures = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').putString(this.croppedImage, 'data_url');
      // The image allocation also returns a promise to be subscribed to.
      pictures.then((result) => {
        // Retrieve the result URL of the saved image as a promise.
        this.picture = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').getDownloadURL();
        this.picture.subscribe((p) => {
          // Once the picture was successfully saved, the avatar will be assigned to the current user
          this.userService.setAvatar(p, this.myuser.uid).then(() => {
            alert('Avatar subido correctamentne');
          }).catch((error) => {
            alert('Hubo un error al tratar de subir la imagen');
            console.log(error);
          });
        });
      }).catch((error) => {
        console.log(error);
      });
    } else {
      // If no image was uploaded, only update the elements within the form
      this.userService.updateUser(this.myuser).then(() => {
        alert('Cambios guardados!');
      }).catch((error) => {
        alert('Hubo un error');
        console.log(error);
      });
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
}
