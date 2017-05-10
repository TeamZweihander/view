import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
// import { NativeStorage } from 'ionic-native';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {AuthService} from "../../providers/auth-service";

/**
 * Created by Avinash on 2017/05/06.
 */
@Component({
  selector: 'settings',
  templateUrl: "settings.html"
})
export class SettingsPage{
  maps: boolean = true;
  email: boolean = true;
  sms: boolean = false;
  push: boolean = false;
  isLoggedIn: boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, private storage: Storage, private auth: AuthService)
  {
    this.isLoggedIn = this.auth.isAuthenticated();
    this.storage.ready().then(() => {
      this.storage.get('settings').then((val) => {
        this.maps = val.maps == 'road';
        this.email = val.email;
        this.sms = val.sms;
        this.push = val.push;
      }).catch((err) => {
        this.storage.set('settings', {maps: 'road', email: true, sms: false, push: false}).then().catch((err) => {
          this.toastCtrl.create({
            message: 'Failed to retrieve your map settings',
            showCloseButton: true,
            closeButtonText: 'Ok'
          }).present();
        });
      });
    });
    // NativeStorage.getItem('settings')
    //   .then(
    //     data => {
    //       this.maps = data.maps;
    //     },
    //     error => {
    //       NativeStorage.setItem('settings', {maps: 'road' }).then(
    //         () => {this.maps = true;},
    //         error =>
    //         {
    //           this.toastCtrl.create({
    //             message: 'Failed to retrieve your map settings',
    //             showCloseButton: true,
    //             closeButtonText: 'Ok'
    //           }).present();
    //         }
    //       );
    //     }
    //   );
  }

  mapType() {

    if (this.maps) {
      this.storage.ready().then(() => {
          this.storage.set('settings', {maps: 'road', email: this.email, sms: this.sms, push: this.push}).then(
            () => {
              // this.toastCtrl.create({
              //   message: 'Successfully updated map settings to ROAD',
              //   duration: 3000
              // }).present();
            }
          ).catch((err) => {
            this.toastCtrl.create({
              message: 'Failed to update your map settings',
              showCloseButton: true,
              closeButtonText: 'Ok'
            }).present();
          });
        });
    }
    else {
      this.storage.ready().then(() => {
        this.storage.set('settings', {maps: 'sat', email: this.email, sms: this.sms, push: this.push}).then(
          () => {
            // this.toastCtrl.create({
            //   message: 'Successfully updated map settings',
            //   duration: 3000
            // }).present();
          }
        ).catch((err) => {
          this.toastCtrl.create({
            message: 'Failed to update your map settings',
            showCloseButton: true,
            closeButtonText: 'Ok'
          }).present();
        });
      });
      // NativeStorage.setItem('settings', {maps: 'sat' }).then(
      //   () => {
      //     this.toastCtrl.create({
      //       message: 'Successfully stored your map settings.',
      //       duration: 2000
      //     }).present();
      //   },
      //   error => {
      //     this.toastCtrl.create({
      //       message: 'Failed to update your map settings.',
      //       showCloseButton: true,
      //       closeButtonText: 'Ok'
      //     }).present();
      //   }
      // );
    }
  }

  notificationUpdate() {
    let tmp = this.maps;
      this.storage.ready().then(() => {
        this.storage.set('settings', {maps: tmp, email: this.email, sms: this.sms, push: this.push}).then(
          () => {
            // this.toastCtrl.create({
            //   message: 'Successfully updated notification settings',
            //   duration: 3000
            // }).present();
          }
        ).catch((err) => {
          this.toastCtrl.create({
            message: 'Failed to update your notification settings',
            showCloseButton: true,
            closeButtonText: 'Ok'
          }).present();
        });
      });
  }
}
