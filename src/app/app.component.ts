import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {API} from "../util/API";
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {HomePage} from "../pages/home/home";
import {EventsListPage} from "../pages/events-list/events-list";
import { AuthService } from "../providers/auth-service";
import {UserModel} from '../models/user-model';
import {SettingsPage} from "../pages/settings/settings";

@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage = HomePage;
  avatar = "";
  name = "";
  email = "";
  isLoggedIn = false;
  currentUser: UserModel = null;

  constructor(platform: Platform, private authService: AuthService) {
    Splashscreen.show();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
    this.authService.loadPersistedUser();
    this.loadData() ;
  }

  loadData() {
    if(this.authService.isAuthenticated())
    {
      this.currentUser = this.authService.getUser();
      if(this.currentUser.profileImage != "")
        this.avatar = "data:image/png;base64," + this.currentUser.profileImage;
      else
        this.avatar = "assets/images/user_avatar.svg";
      this.name = this.currentUser.name;
      this.email = this.currentUser.email;
      this.isLoggedIn = true;
      // this.pages = [{ title: 'Events', component:  EventsListPage }];
    }
    else
    {
      this.avatar = "assets/images/user_avatar.svg";
      this.name = "Guest";
      this.email = "";
      this.isLoggedIn = false;
      // this.pages = [{ title: 'Login', component: LoginPage }];
    }
  }

  logout() {
    this.authService.logout();
    this.loadData() ;
  }
  settings() {
    this.nav.push(SettingsPage);
  }
  events() {
    this.nav.push(EventsListPage);
  }
  login() {
    this.nav.push(LoginPage);
  }
  verify() {
    this.isLoggedIn = this.authService.isAuthenticated();
    return this.isLoggedIn;
  }

}
