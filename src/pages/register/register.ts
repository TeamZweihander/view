import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { NavController, AlertController, LoadingController, Loading, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import {Camera} from 'ionic-native';
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
 loading: Loading;
  registerCredentials = {username: '', email: '', password: '', remember: 0, profileImage: ''};
  public base64Image: string = "assets/images/user_avatar.svg";

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {}

  public register() {
    this.showLoading();
    if(this.registerCredentials.profileImage == '')
    {
      let alert = this.alertCtrl.create({
        title: 'Profile Picture',
        subTitle: 'Would you like to upload a picture of yourself?',
        buttons: [ {
          text: 'Ok',
          handler: () => {
            this.takePhoto();
             this.auth.register(this.registerCredentials).subscribe(allowed => {
                if (allowed) {
                  setTimeout(() => {
                  this.loading.dismiss();
                  this.nav.setRoot(LoginPage)
                  });
                } else {
                  this.showError("Access Denied");
                }
              },
              error => {
                this.showError(error);
              });
          }
        }, {
          text: 'Cancel',
          handler: () => {
             this.auth.register(this.registerCredentials).subscribe(allowed => {
                if (allowed) {
                  setTimeout(() => {
                  this.loading.dismiss();
                  this.nav.setRoot(HomePage)
                  });
                } else {
                  this.showError("Access Denied");
                }
              },
              error => {
                this.showError(error);
              });
          }
        }]
      });
      alert.present();
    }
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  takePhoto(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 300,
        targetHeight: 300,
        cameraDirection:1
    }).then((imageData) => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.registerCredentials.profileImage = imageData;
    }, (err) => {
        alert(err);
    });
  }
}
