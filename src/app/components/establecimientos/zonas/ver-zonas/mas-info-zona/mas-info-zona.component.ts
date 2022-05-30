import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, shareReplay } from 'rxjs';
import { Zona } from 'src/app/models/zona';

@Component({
  selector: 'app-mas-info-zona',
  templateUrl: './mas-info-zona.component.html',
  styleUrls: ['./mas-info-zona.component.scss']
})
export class MasInfoZonaComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

    isDialog = false;
  @Input('zonaDetalles') zonaDetalles!: Zona;
  
  constructor(
    private breakpointObserver: BreakpointObserver,
    @Inject(MAT_DIALOG_DATA) public data: {isDialog: boolean}
  ) { 
    this.isDialog = data ? data.isDialog : false;
  }

  ngOnInit(): void {
  }

}
