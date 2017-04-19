import { Component } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';
import { EventPage } from '../event/event';
import { EventModel } from "../../models/event-model";
import { DateModel } from "../../models/date-model";
import { TimeModel } from "../../models/time-model";
import { LocationModel } from "../../models/location-model";
import { EventService } from "../../providers/event-service";

/*
  Generated class for the EventsList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-events-list',
  templateUrl: 'events-list.html'
})
export class EventsListPage {

  constructor(private viewCtrl: ViewController, private navCtrl: NavController, private eventSrvc: EventService) 
  { 
    this.events = eventSrvc.getEvents();
  }

  launch(data) {
    this.navCtrl.push(EventPage, data);
  }

  events : EventModel[] = [];

}
