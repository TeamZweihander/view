/**
 * Created by Hlengekile on 5/9/2017.
 */
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {LocationModel} from '../models/location-model';

@Injectable()
export class LocationsService {
  constructor(public httpInterface: Http) {
  }

  private inlocation: LocationModel;

  items = [];

  initializeItems() {
    this.items = [
      {name: this.inlocation.name, location: {lat: this.inlocation.lat, lng: this.inlocation.lon}},
      {name: 'Centenary', location: {lat: 121, lng: 131}},
      {name: 'IT', location: {lat: 131, lng: 141}},
      {name: 'EMS', location: {lat: 141, lng: 151}},
      {name: 'HB', location: {lat: 151, lng: 161}},
    ];
  }

  getLocationsList() {
    return this.items;
  }

}
