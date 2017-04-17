import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  filterOptionId;
  locationId;

  items = [];
  baseClassFilterButton = "icon-circle-filled";
  
  filters = [
      { value: "Cart", icon: "cart", id : "1"}, 
      { value: "Paw", icon: "paw", id : "2" }, 
      { value: "Cart", icon: "cart", id : "3" }, 
      { value: "Paw", icon: "paw", id : "4" }, 
      { value: "Cart", icon: "cart", id : "5" }, 
      { value: "Paw", icon: "paw", id : "6" }, 
      { value: "Cart", icon: "cart", id : "7" }, 
      { value: "Paw", icon: "paw", id : "8" }
    ];

  constructor(private viewCtrl: ViewController) { }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

  ngAfterViewInit() {
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
    this.filterOptionId = filter.id;

    var filterButtons = document.getElementsByName('filterButton');
    for(var i = 0; i < filterButtons.length; i++)
      filterButtons.item(i).classList.remove("icon-circle-checked");
    event.target.classList.add("icon-circle-checked");
  }

  initializeItems() {
    this.items = [
      {name : 'Amsterdam', distance : '420', id : "1"},
      {name : 'Bogota', distance : '666', id : "2"},
      {name : 'Buenos Aires', distance : '420', id : "3"},
      {name : 'Cairo', distance : '666', id : "4"},
      {name : 'Dhaka', distance : '420', id : "5"},
      {name : 'Edinburgh', distance : '666', id : "6"},
      {name : 'Geneva', distance : '420', id : "7"},
      {name : 'Genoa', distance : '666', id : "8"}
    ];
  }

  getItems(ev) {
    var val = ev.target.value;

    if (val && val.trim() != '') {
      //Until I know where to send the request and what to expect i can't do anything
      this.initializeItems();
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.items = this.items.slice(0, 4); 
      //


    }

   
  }

}