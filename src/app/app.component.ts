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

@Component({
  templateUrl: 'app.html',
  providers: [API]
})

export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage = HomePage;
  pages: Array<{title: string, component: any}>;
  avatar = "";
  name = "";
  email = "";
  isLoggedIn = false;
  currentUser: UserModel = null;

  constructor(platform: Platform, private authService: AuthService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
    this.authService.loadPersistedUser();
    this.loadData() ;
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //this.nav.setRoot(page.component);
    this.nav.push(page.component); //Use this so that back buttons will work
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
      this.pages = [{ title: 'Events', component:  EventsListPage }];
    }
    else
    {
      this.avatar = "assets/images/user_avatar.svg";
      this.name = "Guest";
      this.email = "";
      this.isLoggedIn = false;
      this.pages = [{ title: 'Login', component: LoginPage }];
    }
  }

  logout() {
    this.authService.logout();
    this.loadData() ;
  }
}
