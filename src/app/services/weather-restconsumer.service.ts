import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Weather } from '../interfaces/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherRESTConsumerService {
  constructor(private httpClient: HttpClient) {}

  // Consume the WeatherApi given the location data
  endpoint = 'https://api.openweathermap.org/data/2.5/';
  iconUrl = 'http://openweathermap.org/img/wn/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // HTTP GET
  getWeatherByCoord(lat: string, lon: string) {
    return this.httpClient
      .get(
        this.endpoint +
          'weather?lat=' +
          lat +
          '&lon=' +
          lon +
          '&units=metric&appid=722b360c620ac58a7aceee9a36bf3d2d'
      )
      .pipe(
        map((data: any) => {
          const city = data.name;
          const country = data.sys.country;
          const weather = data.weather[0].main;
          const description = data.weather[0].description;
          const icon = this.iconUrl + data.weather[0].icon + '.png';
          const temp = parseInt(data.main.temp, 10);
          const humidity = data.main.humidity;
          const x: Weather = {
            city,
            country,
            weather,
            description,
            icon,
            temp,
            humidity
          };
          return x;
        })
      ); 
  }

  getGeoLocation(): Observable<any> {
    return new Observable(observer => {
      navigator.geolocation.getCurrentPosition(
        resp => {
          // console.log({lat: resp.coords.latitude, lng: resp.coords.longitude});
          observer.next(resp);
        },
        err => {
          observer.error(err);
        }
      );
    });
  }
}
