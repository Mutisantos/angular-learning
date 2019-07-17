import { TestBed } from '@angular/core/testing';

import { WeatherRESTConsumerService } from './weather-restconsumer.service';

describe('WeatherRESTConsumerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeatherRESTConsumerService = TestBed.get(WeatherRESTConsumerService);
    expect(service).toBeTruthy();
  });
});
