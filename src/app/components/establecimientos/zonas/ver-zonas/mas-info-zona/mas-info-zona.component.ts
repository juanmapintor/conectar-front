import { Component, Input, OnInit } from '@angular/core';
import { Zona } from 'src/app/models/zona';

@Component({
  selector: 'app-mas-info-zona',
  templateUrl: './mas-info-zona.component.html',
  styleUrls: ['./mas-info-zona.component.scss']
})
export class MasInfoZonaComponent implements OnInit {
  
  @Input('zonaDetalles') zonaDetalles!: Zona;
  info = "koko";


  constructor() { }

  ngOnInit(): void {
    this.info = JSON.stringify(this.zonaDetalles);
  }

}
