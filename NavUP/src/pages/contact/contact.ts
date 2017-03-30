import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {API} from "../../util/API";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  api: API;
  data:any;

  constructor(public navCtrl: NavController, api:API) {
    this.api = api;
  }

  ngOnInit() {
    this.api.get("/latest?base=USD").subscribe(
        data => this.data = JSON.stringify(data)
    );
  }
}
