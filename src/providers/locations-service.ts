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

  getLocationsList() {
    

  }

}
