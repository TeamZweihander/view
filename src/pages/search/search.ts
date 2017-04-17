import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

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

  filterOption;
  locationId;

  items = [];
  baseClassFilterButton = "icon-circle-filled";
  
  filters = [
      { Value: "Cart", Icon: "cart"}, 
      { Value: "Paw", Icon: "paw" }, 
      { Value: "Paw", Icon: "paw" }, 
      { Value: "Paw", Icon: "paw" }, 
      { Value: "Paw", Icon: "paw" }, 
      { Value: "Paw", Icon: "paw" }, 
      { Value: "Paw", Icon: "paw" }, 
      { Value: "Paw", Icon: "paw" }
    ];

  constructor(private viewCtrl: ViewController) { }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

  ngAfterViewInit() {
    this.initializeItems();
    this.items = this.items.slice(0, 4); 
    this.initFilterList();
  }

  initFilterList() {
    var filterButtons = document.getElementsByName('filterButton');
    for(var i = 0; i < filterButtons.length; i++)
      filterButtons.item(i).classList.add(this.baseClassFilterButton);

    var filterList = document.getElementById('filterList');
    if((this.filters.length * 60) > document.getElementById('filterList').clientWidth - (document.getElementById('filterList').offsetLeft * 2))
      filterList.style.width = this.filters.length * 60 + "px";
  }

  selectFilter(event, filter) {
    this.filterOption = filter;

    var filterButtons = document.getElementsByName('filterButton');
    for(var i = 0; i < filterButtons.length; i++)
      filterButtons.item(i).classList.remove("icon-circle-checked");
    event.target.classList.add("icon-circle-checked");
  }

  initializeItems() {
    this.items = [
      'Amsterdam',
      'Bogota',
      'Buenos Aires',
      'Cairo',
      'Dhaka',
      'Edinburgh',
      'Geneva',
      'Genoa',
      'Glasglow',
      'Hanoi',
      'Hong Kong',
      'Islamabad',
      'Istanbul',
      'Jakarta',
      'Kiel',
      'Kyoto',
      'Le Havre',
      'Lebanon',
      'Lhasa',
      'Lima',
      'London',
      'Los Angeles',
      'Madrid',
      'Manila',
      'New York',
      'Olympia',
      'Oslo',
      'Panama City',
      'Peking',
      'Philadelphia',
      'San Francisco',
      'Seoul',
      'Taipeh',
      'Tel Aviv',
      'Tokio',
      'Uelzen',
      'Washington'
    ];
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      }); 
    }

    this.items = this.items.slice(0, 4); 
  }

}