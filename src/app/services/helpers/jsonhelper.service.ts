import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JSONHelper {

  constructor() { }
  public static removeEmpty(obj: any) {
    Object.keys(obj).forEach(k =>
      (obj[k] && typeof obj[k] === 'object') && this.removeEmpty(obj[k]) ||
      (!obj[k] && obj[k] !== undefined) && delete obj[k]
    );
    return obj;
  };
}
