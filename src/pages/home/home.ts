import { Component, ViewChild, ElementRef } from '@angular/core';
import {NavController, AlertController, ModalController, NavParams} from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import {SearchPage} from "../search/search";

declare var google;

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('directionsPanel') directionsPanel: ElementRef;
  map: any;
  searchQuery: string = '';

  distanceValue: any = 0.0;
  steps: any = 0;
  destination: string = "ME";
  navigateText: string = "Navigate";
  navigateIcon: string = "send";
  canNavigate: boolean = false;
  lat: number;
  lon: number;
  currentPosition: any;

  constructor(public navCtrl: NavController, public  alertCtrl: AlertController, public modalCtrl: ModalController, public params: NavParams) {
    if (this.params){
      if (this.params.get('distance')) {
        this.distanceValue = this.params.get('distance');
        this.steps = Math.round(this.distanceValue * 1.3);
        this.canNavigate = true;

      }
      if (this.params.get('name'))
      {
        this.destination = this.params.get('name');
      }
      if (this.params.get('lat'))
      {
        this.lat = this.params.get('lat');
      }
      if (this.params.get('lon'))
      {
        this.lon = this.params.get('lon');
        this.addMarker(this.destination,new google.maps.LatLng(this.lat, this.lon));
        setTimeout(()=>{
          this.startNavigating(true);
        }, 2000);

      }

    }
  }

  ionViewDidLoad(){
    this.loadMap();
  }

  loadMap(){
    let options = {timeout: 10000, enableHighAccuracy: true};

    Geolocation.getCurrentPosition(options).then((position) => {
      console.log("fun");
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.currentPosition = latLng;
      let mapOptions = {
        center: latLng,
        zoom: 50,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        controls: {
          'compass': true,
          'myLocationButton': true,
          'indoorPicker': true,
          'zoom': true
        }
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addMarker("ME", this.map.getCenter());

    }, (err) => {
      console.log("err:" + err.toString()+JSON.stringify(err, null, 4));
      // alert("Cannot find your current position, please make sure of your internet connectivity");
      this.alertCtrl.create({
        title: 'Internet Connection',
        subTitle: "Cannot find your location, please make sure you have a valid internet connection",
        buttons: ['OK']
      }).present();
    });
  }

  addMarker(status, pos) {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: pos,
      icon: status == "ME" ? 'assets/images/icon-man.png' : ''
    });

    let content = "<h4>"+this.destination+"</h4>";

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
    if (this.navigateText == "Cancel")
    {
      this.alertCtrl.create({
        title: 'Are you sure ?',
        message: 'Are you sure you wish to cancel navigation to <b>'+this.destination+'</b>.',
        buttons: [
          {
            text: "No",
            role: 'cancel'
          },
          {
            text: 'Yes',
            role: 'success',
            handler: () => {
              this.distanceValue = 0.0;
              this.destination = "";
              this.steps = 0;
              this.canNavigate = false;
              this.navigateText = "Navigate";
              this.navigateIcon = "send";
              this.startNavigating(false);
            }
          }
        ]
      }).present();
      return;
    }

    let alert = this.alertCtrl.create({
      title: 'Are you sure ?',
      message: 'This is the destination you have selected <br/><i text-center><b>'+this.destination+'</b></i>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Start',
          role: 'success',
          handler: () => {
            this.navigateText = "Cancel";
            this.navigateIcon = "close";

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

      if (data.name != null) {
        this.destination = data.name;
        this.canNavigate = true;
        this.distanceValue = data.distance;
        this.steps = Math.round(data.distance * 1.3);
        this.startNavigating(true);

        this.addMarker(this.destination,new google.maps.LatLng(this.lat, this.lon));
      }
    });
    modal.present();
  }

  startNavigating(s){

    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;

    directionsDisplay.setMap(this.map);
    directionsDisplay.setPanel(this.directionsPanel.nativeElement);
    if (s == false)
    {
      directionsDisplay.setDirections(null);
      return;
    }
    directionsService.route({
      origin: this.currentPosition,
      destination: this.destination,
      travelMode: google.maps.TravelMode['WALKING']
    }, (res, status) => {

      if(status == google.maps.DirectionsStatus.OK){
        directionsDisplay.setDirections(res);
      } else {
        console.warn(status);
      }

    });

  }
}
