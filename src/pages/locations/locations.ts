/**
 * Created by Hlengekile on 5/9/2017.
 */
import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {NavController, AlertController, LoadingController, Loading, NavParams} from 'ionic-angular';
import {LocationModel} from "../../models/location-model";

@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html'
})

export class LocationsPage {

  savedLocation: LocationModel = new LocationModel();

  constructor(public nav: NavController, public navParams: NavParams) {

  }

  clickLocation(inData) {
    this.nav.push(HomePage, inData)
  }
}
