import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventModel } from "../../models/event-model";
import { HomePage } from '../home/home';

/*
  Generated class for the Event page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-event',
  templateUrl: 'event.html'
})
export class EventPage {
  event : EventModel = new EventModel();
  
  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {
    this.event = this.navParams.data;
  }

  startNavigating(data) 
  {
      this.navCtrl.setRoot(HomePage, data);
  }

}
