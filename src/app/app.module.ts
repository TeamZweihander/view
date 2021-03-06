import { NgModule, ErrorHandler } from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler, Platform} from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SearchPage } from '../pages/search/search';
import { EventPage } from '../pages/event/event';
import { EventsListPage } from '../pages/events-list/events-list';
import {LocationsPage} from '../pages/locations/locations';
import { AuthService } from '../providers/auth-service';
import { EventService } from '../providers/event-service';
import { NavService } from '../providers/nav-service';
import { RegisterPage } from '../pages/register/register';
import {SplashScreen} from "@ionic-native/splash-screen";
import {StatusBar} from "@ionic-native/status-bar";
import {SanitizeHtml} from "../util/sanitizeHTML";
import {API} from "../util/API";
import {Device} from "ionic-native";
import {Hotspot} from "ionic-native";
import {SettingsPage} from "../pages/settings/settings";
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    SearchPage,
    EventsListPage,
    EventPage,
    LocationsPage,
    SanitizeHtml,
    SettingsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: 'NavUP',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    EventsListPage,
    EventPage,
    SearchPage,
    SettingsPage,
    LocationsPage
  ],
  providers: [StatusBar, SplashScreen, Device, Hotspot, EventService, AuthService, API, NavService, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
