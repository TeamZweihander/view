import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  filterOptionId = 0;

  items = [];
  baseClassFilterButton = "icon-circle-filled";
  
  filters = [];

  constructor(private viewCtrl: ViewController) { }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

  ngAfterViewInit() {
    //this.initFilterList();
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
    if(!event.target.classList.contains("icon-circle-checked"))
    {
      this.filterOptionId = filter.id;

      var filterButtons = document.getElementsByName('filterButton');
      for(var i = 0; i < filterButtons.length; i++)
        filterButtons.item(i).classList.remove("icon-circle-checked");
      event.target.classList.add("icon-circle-checked");
    }
    else
    {
      this.filterOptionId = 0;
      event.target.classList.remove("icon-circle-checked");
    }
  }

  initializeItems() {
    this.items = [
      {name : 'Amsterdam', distance : '420', id : "1", type : "1"},
      {name : 'Bogota', distance : '666', id : "2", type : "1"},
      {name : 'Buenos Aires', distance : '420', id : "3", type : "1"},
      {name : 'Cairo', distance : '666', id : "4", type : "1"},
      {name : 'Dhaka', distance : '420', id : "5", type : "2"},
      {name : 'Edinburgh', distance : '666', id : "6", type : "2"},
      {name : 'Geneva', distance : '420', id : "7", type : "2"},
      {name : 'Genoa', distance : '666', id : "8", type : "2"}
    ];
  }

  getItems(ev) {
    var val = ev.target.value;

    //Until I know where to send the request and what to expect i can't do anything
    this.initializeItems();
    this.items = this.items.filter((item) => {
      if(val && val.trim() != '')
        if(this.filterOptionId != 0) 
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1 && item.type == this.filterOptionId);
        else return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      else return false;
    });
    this.items = this.items.slice(0, 4); 
    //

   
  }

}