/**
 * Created by Avinash on 2017/04/06.
 */

import {DomSanitizer} from "@angular/platform-browser";
import {Injectable, Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'sanitizeHTML'
})

@Injectable()
export class SanitizeHtml implements PipeTransform  {

  constructor(private _sanitizer: DomSanitizer){}

  transform(v: string)  {
    return this._sanitizer.bypassSecurityTrustHtml(v);
  }
}

