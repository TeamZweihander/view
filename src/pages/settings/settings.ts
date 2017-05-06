import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {HomePage} from "../home/home";
/**
 * Created by Avinash on 2017/05/06.
 */
@Component({
  selector: 'settings',
  templateUrl: "settings.html"
})
export class SettingsPage{

  constructor(public navCtrl: NavController, public navParams: NavParams)
  {

  }

}
