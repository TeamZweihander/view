import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}

export class HomePage {
private items: string[];

  query: string = "";
  listitme:string= '' ;

  constructor(private navCtrl: NavController) {
    this.initializeItems();
  }

  initializeItems() {
    this.items = [
      'Harvey Burton',
      'Barnett Crosby',
      'Peck Brock',
      'Rachel Robinson',
      'Suzette Frazier',
      'Bettie Maddox',
      'Haley Bates',
      'Tania Chandler',
      'Woods Nicholson'
    ]
  }

  getItems() {
    // Here you can add your console.log(...);
    console.log('The search button has been clicked...');

    this.initializeItems();
    let val = this.query
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  setitem(item){
    this.listitme = item;
  }
}
