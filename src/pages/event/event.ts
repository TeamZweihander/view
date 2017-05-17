import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventModel } from "../../models/event-model";
import { HomePage } from '../home/home';
import {Http, RequestOptions, Headers} from "@angular/http";
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http)
  {
    this.event = this.navParams.data;
    this.sendMail();
  }

  startNavigating(data)
  {
      this.navCtrl.setRoot(HomePage, data);
  }

  sendMail() {
    alert("Sending email");
    let body = JSON.stringify({"type": "EMAIL", "username": "baloyi", "subject": "F", "message": "funnnn"});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.post("/notification", body, options)
      .map(res => {
        let data = res.json();
        alert(JSON.stringify(res.json()));
        // this.currentUser = new UserModel(1, data.username, data.email, "");

      })
  }

}
