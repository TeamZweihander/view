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
            { value: "Cart", icon: "cart", id : "3" }, 
            { value: "Paw", icon: "paw", id : "4" }, 
            { value: "Cart", icon: "cart", id : "5" }, 
            { value: "Paw", icon: "paw", id : "6" }, 
            { value: "Cart", icon: "cart", id : "7" }, 
            { value: "Paw", icon: "paw", id : "8" }
        ];
    }

    getLocations(searchText: string, filterId: number) {
        
    }
}
