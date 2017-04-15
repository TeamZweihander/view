import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import {API} from "../util/API";
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {HomePage} from "../pages/home/home";

@Component({
  templateUrl: 'app.html',
  providers: [API]
})

export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage = HomePage;
  pages: Array<{title: string, component: any}>;
  avatar = "assets/images/user_avatar.svg";
  name = "Guest";


  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
    this.pages = [
      { title: 'Login', component: LoginPage },
      { title: 'Register', component: RegisterPage }];
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
