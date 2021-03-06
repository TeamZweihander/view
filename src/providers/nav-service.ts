import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class NavService {
	constructor(public httpInterface: Http) {  }

    getLocationTypes() {
        return [
            { value: "Cart", icon: "cart", id : "1"},
            { value: "Paw", icon: "paw", id : "2" },
            { value: "Car", icon: "car", id : "3" },
            { value: "Sport", icon: "football", id : "4" },
            { value: "Emergency", icon: "medkit", id : "5" },
            { value: "Airport", icon: "plane", id : "6" },
            { value: "Food", icon: "restaurant", id : "7" },
            { value: "Bar", icon: "wine", id : "8" }
        ];
    }

    items = [];
    initializeItems() {
        this.items = [
        {name : 'University Of Pretoria', distance : '420', id : "1", type : "1"},
        {name : 'Haloa', distance : '666', id : "2", type : "1"},
        {name : 'Engineering III', distance : '420', id : "3", type : "1"},
        {name : 'Adlars', distance : '666', id : "4", type : "1"},
        {name : 'Oom Gerts', distance : '420', id : "5", type : "2"},
        {name : 'Sci-Enza', distance : '666', id : "6", type : "2"},
        {name : 'Steers', distance : '420', id : "7", type : "2"},
        ];
    }

    getLocations(searchText: string, filterId: number) {
        this.initializeItems();
        this.items = this.items.filter((item) => {
        if(searchText && searchText.trim() != '')
            if(filterId != 0)
            return (item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1 && item.type == filterId);
            else return (item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
        else return false;
        });
        this.items = this.items.slice(0, 4);
        return this.items;
    }
}
