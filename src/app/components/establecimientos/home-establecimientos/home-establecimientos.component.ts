import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'app-home-establecimientos',
  templateUrl: './home-establecimientos.component.html',
  styleUrls: ['./home-establecimientos.component.scss']
})
export class HomeEstablecimientosComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
  .observe(Breakpoints.Handset)
  .pipe(
    map((result) => result.matches),
    shareReplay()
  );
  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
  }

}
