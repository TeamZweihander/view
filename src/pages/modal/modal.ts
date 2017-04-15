/**
 * Created by Avinash on 2017/04/15.
 */
import { ViewController} from 'ionic-angular';
import {Component} from "@angular/core";

@Component({
  templateUrl: 'modal.html'
})
export class Modal {

  constructor(private viewCtrl: ViewController) {
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

}
