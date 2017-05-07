import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import { NativeStorage } from 'ionic-native';
import { ToastController } from 'ionic-angular';
/**
 * Created by Avinash on 2017/05/06.
 */
@Component({
  selector: 'settings',
  templateUrl: "settings.html"
})
export class SettingsPage{
  maps: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController)
  {
    NativeStorage.getItem('settings')
      .then(
        data => {
          this.maps = data.maps;
        },
        error => {
          NativeStorage.setItem('settings', {maps: 'road' }).then(
            () => {this.maps = true;},
            error =>
            {
              this.toastCtrl.create({
                message: 'Failed to retrieve your map settings',
                showCloseButton: true,
                closeButtonText: 'Ok'
              }).present();
            }
          );
        }
      );
  }

  mapType() {

    if (this.maps) {

      NativeStorage.setItem('settings', {maps: 'road' }).then(
        () => {
          this.toastCtrl.create({
            message: 'Successfully stored your map settings.',
            duration: 2000
          }).present();
        },
        error => {
          this.toastCtrl.create({
            message: 'Failed to update your map settings.',
            showCloseButton: true,
            closeButtonText: 'Ok'
          }).present();
        }
      );
    }
    else {

      NativeStorage.setItem('settings', {maps: 'sat' }).then(
        () => {
          this.toastCtrl.create({
            message: 'Successfully stored your map settings.',
            duration: 2000
          }).present();
        },
        error => {
          this.toastCtrl.create({
            message: 'Failed to update your map settings.',
            showCloseButton: true,
            closeButtonText: 'Ok'
          }).present();
        }
      );
    }
  }
}
