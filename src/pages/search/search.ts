import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { NavService } from "../../providers/nav-service";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  baseClassFilterButton = "icon-circle-filled";
  filterOptionId = 0;
  searchText = "";
  items = [];
  filters = [];
 
  constructor(private viewCtrl: ViewController, private navSrvc: NavService) 
  {
    this.filters = navSrvc.getLocationTypes();
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

  ngAfterViewInit() {
    if(this.filters.length > 0)
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
    this.items = this.navSrvc.getLocations(this.searchText, this.filterOptionId);
  }

 

  getItems(ev) {
    this.searchText = ev.target.value;
    this.items = this.navSrvc.getLocations(this.searchText, this.filterOptionId);
  }

}