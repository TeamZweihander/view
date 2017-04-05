import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export class User {
  name: string;
  email: string;
 
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

@Injectable()
export class AuthService {
  currentUser: User;
	
	constructor(public httpInterface: Http) {  }
 
	//must return Observable<boolean>
  public login(credentials) {
		this.currentUser = new User('RuLog', 'ru@rumail.com');
		/*let response = this.httpInterface.get('url to login function')
				.map(payslips => <User>payslips.json())
				.catch(this.handleError);
	  
	  //Don't know how the user object will look, so this will have to change
		response.subscribe( user => { this.currentUser = user } );	
		*/
	  
	  //Return observable boolean, indicating if login was successful
		if(this.currentUser){
			return new Observable<boolean>(observer => {
					observer.next(true);
			});
		}
		else {
			return new Observable<boolean>(observer => {
					observer.next(false);
			});
		}
  }
 
  //must return Observable<boolean>
  public register(credentials) {
		this.currentUser = new User('RuReg', 'ru@rumail.com');
	  
		/*let response = this.httpInterface.get('url to register function')
				.map(payslips => <User>payslips.json())
				.catch(this.handleError);
		
	  //Don't know how the user object will look, so this will have to change
		response.subscribe( user => { this.currentUser = user } );	
		*/
	  
	   //Return observable boolean, indicating if registration was successful
		if(this.currentUser){
			return new Observable<boolean>(observer => {
					observer.next(true);
			});
		}
		else {
			return new Observable<boolean>(observer => {
					observer.next(false);
			});
		}
  }
 
  public getUserInfo() : User {
    return this.currentUser;
  }
 
  public logout() {
	  
	//Destroy login
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
	
  }
  
  	private handleError(error: Response) {
        console.error("Account Service: " + error);
        return Observable.throw(error.statusText || 'Server error');
    }
  

}
