/**
 * Created by Hlengekile on 5/9/2017.
 */
import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';


@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html'
})

export class LocationsPage {

  selectedItem: any;
  items: Array<{ name: string, longitude: string, latitude: string }>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {

    this.navParams.get('user');
    this.storage.ready().then(() => {

      this.storage.get('savedLocations').then((value) => {
        if (value != null)
          this.items = value;
      })
    })
  }

  itemTapped(item) {
    this.navCtrl.push(HomePage, {
      item: item
    });
  }
}

