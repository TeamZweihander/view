/**
 * Created by Hlengekile on 5/9/2017.
 */
import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {NavController, NavParams} from 'ionic-angular';


@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html'
})

export class LocationsPage {

  selectedItem: any;
  items: Array<{ name: string, longitude: string, latitude: string }>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.navParams.get('user');

    //TODO Get list of saved locations from Navgation module

    //Load list with the User's saved locations
    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        name: 'Location ' + i,
        longitude: 'yyy',
        latitude: 'xxx'
      });
    }

  }

  itemTapped(event, item) {
    this.navCtrl.push(HomePage, {
      item: item
    });
  }
}

