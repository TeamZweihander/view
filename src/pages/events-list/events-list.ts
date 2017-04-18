import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/*
  Generated class for the EventsList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-events-list',
  templateUrl: 'events-list.html'
})
export class EventsListPage {

  events = [
      { title: "Title", description: "descriptiondescriptiondescriptiondescriptiondescription descriptiondescriptiondescriptiondescriptiondescriptiondescription descriptiondescriptiondescription descriptiondescriptiondescription descriptiondescription description description description", image : "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAOJJREFUSInt1T1KA1EUBeAvJsTGdcQqhSAIrsCNCDbZh1Uai0A24Cq0FmyUWNhqp3UgQaKTYp6OyGDuMwkk4IELj8M975x5f8Oa0czobeMUBxjhY9Vh+ihSnUdFOxkGnW/j/QxdGMd4SnUUFTUCPbvoKVN/9hd4xAXesmLWYKha+581WHZyeP3F4GWROLLJbVzV8DfK5VvaAGY13HtEmHNM/4SNMSgy+S+0ApNf4hknGCduD9e4j6SL4FCZ9i5VkbiF2Jg9+DfYYoPIPaB68yeqf8J0lQYjnOFW+dVdPAS168UcDEAvBGOVlpYAAAAASUVORK5CYII="}
    ];

  constructor(private viewCtrl: ViewController) { }

  launch(data) {
    
  }

}
