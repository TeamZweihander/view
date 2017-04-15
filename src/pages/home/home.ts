import { Component, ViewChild, ElementRef } from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import {Modal} from "../modal/modal";


declare var google;

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('nav') navigatebtn: ElementRef;
  map: any;
  searchQuery: string = '';
  items: string[];
  distanceValue: any = 0.0;
  steps: any = 0;
  destination: string = "";
  canNavigate: boolean = true;


  constructor(public navCtrl: NavController, public  alertCtrl: AlertController) {

  }

  ionViewDidLoad(){
    this.loadMap();
  }
  menu() {

  }
  loadMap(){
    let options = {timeout: 10000, enableHighAccuracy: true};

    Geolocation.getCurrentPosition(options).then((position) => {
      console.log("fun");
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 50,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addMarker("ME");

    }, (err) => {
      console.log("err:" + err.toString()+JSON.stringify(err, null, 4));
    });

  }

  addMarker(status){

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter(),
      icon: status == "ME" ? '/assets/images/icon-man.png' : ''
    });

    let content = "<h4>Information!</h4>";

    this.addInfoWindow(marker, content);

  }

  addInfoWindow(marker, content){

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  initializeItems() {
    this.items = [
      'EMB 2-22',
      'I.T 2-25',
      'I.T 2-27',
      'Oom Gertz'
    ];
  }

  getItems(ev: any) {
    this.initializeItems();

    let val = ev.target.value;

    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  onCancel(ev: any) {
    this.items = null;
    return this.items;
  }

  distance() {
    let alert = this.alertCtrl.create({
      title: 'Distance',
      subTitle: 'Number of Meters to your destination. <br/> <ion-badge text-center><b>'+this.distanceValue+'</b></ion-badge> Meters',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  step() {
    let alert = this.alertCtrl.create({
      title: 'Step',
      subTitle: 'The estimated number of steps to get your to your destination. <br/> <ion-badge text-center><b>'+this.steps+'</b></ion-badge> Steps',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  navigate() {
    let alert = this.alertCtrl.create({
      title: 'Are you sure ?',
      message: 'This is the destination you have selected <br/><i text-center><b>'+this.destination+'</b></i>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Start',
          role: 'success',
          handler: () => {
            console.log('Got to Navigation page');
          }
        }
      ]
    });
    alert.present();
  }

  setDestination(ev: any) {
    this.items = null;
    if (ev != "") {
      this.canNavigate = false;
      this.destination = ev;
    }
  }
  isNavigate() {
    if (this.destination == "")
      return true;
    return this.canNavigate;
  }

}
