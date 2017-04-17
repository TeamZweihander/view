/**
 * Created by Avinash on 2017-03-30.
 */
import {Injectable} from '@angular/core';

import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

let baseURL = "http://api.fixer.io/";

@Injectable()
export class API {
    http: Http;

    constructor (http:Http) {
        this.http = http;
    }

    static get parameters() {
        return [[Http]];
    }

    get(url) {
        return this.http.get(baseURL + url)
            .map(res => res.json())
            .catch(this.handleError);
    }

    post(url, data) {
        let body = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(baseURL + url, body, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    patch(url, data) {
      let body = JSON.stringify(data);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.patch(baseURL + url, body, options)
        .map(res => res.json())
        .catch(this.handleError);
    }



    handleError(error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
