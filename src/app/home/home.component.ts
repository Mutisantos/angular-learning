import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { WeatherRESTConsumerService } from '../services/weather-restconsumer.service';
import { flatMap } from 'rxjs/operators';
import { Weather } from '../interfaces/weather';
import { RequestService } from '../services/request.service';
// tslint:disable:no-inferrable-types
// tslint:disable:prefer-const
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  friends: User[];
  myuser: User;
  weatherData: Weather;
  friendEmail: string;
  // Define a variable that will be represented by an ngModel input
  query: string = '';
  constructor(private userService: UserService, private authService: AuthService,
              private router: Router, private weatherService: WeatherRESTConsumerService,
              private requestService: RequestService) {
    // this.typeExercise();
    // Get an observable from the user registries in firebase Database, subscribe to changing values of the observable
    userService.getUsers().valueChanges().subscribe(
      (data: User[]) => {console.log(data); this.friends = data; },
      (error) => {console.log(error); }
    );
    this.getWeatherCondition();
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

  typeExercise() {
    // Unfixed type variable
    let c = 1.0;
    let b = '2.0';
    // Defined type variables
    let aNumber: number = 12;
    let cString: string = '';
    let bulean: boolean = false;
    let objecto: object = {};
    // Unfixed type array
    let arregloMutable = [c, 'basd', 'c', 1.23, -1, false];
    // Fixed type array, it won't support other typed values
    let arregloEntero: number[] = [1, 2, 3, 4, 45];
    // Explicitly unfixed type array
    let arregloCualquiera: any[] = [aNumber, cString, bulean, objecto];
    console.log(arregloMutable);
  }

  logout() {
    this.authService.logOut()
    .then(
      () => {
        alert('Sesión Cerrada');
        this.router.navigate(['login']);
      }
    )
    .catch(
      (error) => { console.log(error); }
    );
  }

  private getWeatherCondition() {
    this.weatherService.getGeoLocation().pipe(
      flatMap (
        (resp) => this.weatherService.getWeatherByCoord(resp.coords.latitude, resp.coords.longitude),
      )
    ).subscribe( // Solo se necesita suscribirse al servicio final para completar el proceso
      (data: Weather ) => {
        this.weatherData = data;
        console.log(data);
      },
      (err) => {
        err = ' No es posible consultar el servicio del clima en estos momentos.';
        console.log(err);
      }
    );
  }

  ngOnInit() {}


  sendRequest( ) {
    const request = {
      timestamp: Date.now(),
      receiverEmail: this.friendEmail,
      senderEmail: this.myuser.email.replace('.', ','),
      sender: this.myuser.uid,
      status: 'pending'
    };
    // The request will be sent to the service and with the "then()" will show an alert once the message was sent or error otherwise
    this.requestService.createFriendRequest(request).then(() => {
      alert('Solicitud enviada para:' + request.receiverEmail);
    }).catch((error) => {
      alert('Error enviando solicitud para:' + request.receiverEmail);
      console.log(error);
    });
  }
}
