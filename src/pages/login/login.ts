import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import {AndroidFingerprintAuth} from "ionic-native";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loading: Loading;
  registerCredentials = {email: '', password: '', remember: 0, finger: false};

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {

  }

  public createAccount() {
    this.nav.push(RegisterPage);
  }

  public login() {
    this.showLoading();
    this.auth.login(this.registerCredentials).subscribe(allowed => {
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

  public fingerprintLogin() {
   AndroidFingerprintAuth.isAvailable()
      .then((result)=> {
        if(result.isAvailable){
          AndroidFingerprintAuth.encrypt({ clientId: "NavUP", username: "myUsername", password: "myPassword" })
            .then(result => {
              if (result.withFingerprint) {
                console.log("Successfully encrypted credentials.");
                console.log("Encrypted credentials: " + result.token);
                this.registerCredentials.email = "Admin";
                this.registerCredentials.password = "P@ssW0rd";
                this.registerCredentials.finger = true;

                this.login();
              } else if (result.withBackup) {
                this.login();
              } else console.log('Didn\'t authenticate!');
            })
            .catch(error => {
              if (error === "Cancelled") {
                console.log("Fingerprint authentication cancelled");
              } else {
                this.alertCtrl.create({
                  title: 'Access Denied',
                  subTitle: "Seems like you are not registered for password login",
                  buttons: ['OK']
                }).present();
              }
            });

        } else {
          this.alertCtrl.create({
            title: 'Access Denied',
            subTitle: "Seems like you are not registered for password login",
            buttons: ['OK']
          }).present();
        }
      })
      .catch(error => {
        this.alertCtrl.create({
          title: 'Fingerprint Error',
          subTitle: "Seems like you your phone does not support fingerprint access",
          buttons: ['OK']
        }).present();
      });
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


}
