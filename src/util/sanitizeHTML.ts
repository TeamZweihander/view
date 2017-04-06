/**
 * Created by Avinash on 2017/04/06.
 */

import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'sanitizeHTML'
})
export class SanitizeHtml implements PipeTransform  {

  constructor(private _sanitizer: DomSanitizer){}

  transform(v: string) : SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(v);
  }
}
