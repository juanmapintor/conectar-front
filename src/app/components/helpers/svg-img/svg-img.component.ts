import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'svg-img',
  templateUrl: './svg-img.component.html',
  styleUrls: ['./svg-img.component.scss']
})
export class SvgImgComponent implements OnInit {

  svgHtml: string = '';
  @Input() fillColor: string = 'black';
  @Input() src: string = '';
  

  constructor(private _http: HttpClient, public sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.loadHtml();
  }

  private async loadHtml(){
    try {
      let response = await firstValueFrom(this._http.get(this.src, {responseType: 'text'}));
      this.svgHtml = `<svg style="width: 100%; height: 100%; fill: ${this.fillColor}" ${response.slice(5)}`;
    } catch (error) {
      this.svgHtml = `<p style="color: red;">Error cargando la imagen</p>`;
    }
  }
}
