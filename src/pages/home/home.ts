import { Component, ViewChild, ElementRef } from '@angular/core';
import {NavController, AlertController, ModalController} from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import {SearchPage} from "../search/search";

declare var google;

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;

  map: any;
  searchQuery: string = '';

  distanceValue: any = 0.0;
  steps: any = 0;
  destination: string = "";
  canNavigate: boolean = false;

  constructor(public navCtrl: NavController, public  alertCtrl: AlertController, public modalCtrl: ModalController) {
  }

  ionViewDidLoad(){
    this.loadMap();
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

  distance() {
    let alert = this.alertCtrl.create({
      title: 'Distance',
      subTitle: 'Number of Meters to your destination. <br/> <span text-center><b>'+this.distanceValue+'</b></span> Meters',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  step() {
    let alert = this.alertCtrl.create({
      title: 'Step',
      subTitle: 'The estimated number of steps to get your to your destination. <br/> <span text-center><b>'+this.steps+'</b></span> Steps',
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

  isNavigate() {
    return this.canNavigate;
  }

  presentModal() {
    let modal = this.modalCtrl.create(SearchPage);
    modal.onDidDismiss(data => {
      alert(JSON.stringify(data));
      if (data.name != null) {
        this.destination = data.name;
        this.canNavigate = true;
      }
    });
    modal.present();
  }

}
