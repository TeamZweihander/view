import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SearchPage } from '../pages/search/search';
import { EventsListPage } from '../pages/event-list/event-list';
import { AuthService } from '../providers/auth-service';
import { RegisterPage } from '../pages/register/register';
import {SplashScreen} from "@ionic-native/splash-screen";
import {StatusBar} from "@ionic-native/status-bar";
import {SanitizeHtml} from "../util/sanitizeHTML";


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    SearchPage,
    EventsListPage,
    SanitizeHtml
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    EventsListPage,
    SearchPage
  ],
  providers: [StatusBar, SplashScreen, AuthService, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
