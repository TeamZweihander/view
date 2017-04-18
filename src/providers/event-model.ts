import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {DateModel} from "./date-model";
import {TimeModel} from "./time-model";
import {LocationModel} from "./location-model";

/*
  Generated class for the EventModel provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EventModel {

  public id: number;
  public name: string;
  public image: string;
  public date: DateModel;
  public to: TimeModel;
  public from: TimeModel;
  public destination: LocationModel;
}
