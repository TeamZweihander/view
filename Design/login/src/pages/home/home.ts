import { Component } from '@angular/core';
import { AuthService, User } from '../../providers/auth-service';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	currentUser: User;
	
	constructor(private nav: NavController, private auth: AuthService) {
		this.currentUser = this.auth.getUserInfo();
  }
}

