import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import {LoginPage} from "../login/login";
import {RegisterPage} from "../register/register";

import { ModalController } from 'ionic-angular';
import { SearchPage } from '../search/search';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = LoginPage;
  tab3Root: any = RegisterPage;

  constructor(public modalCtrl: ModalController) {
    
  }

  presentModal() {
    alert("dd");
    let modal = this.modalCtrl.create(SearchPage);
    modal.onDidDismiss(data => {alert(JSON.stringify(data))});
    modal.present();
  }
}
