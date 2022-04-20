import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { fadeInAnimation } from 'src/app/animations/animations';
@Component({
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' },
  selector: 'app-home-dispositivos',
  templateUrl: './home-dispositivos.component.html',
  styleUrls: ['./home-dispositivos.component.scss']
})
export class HomeDispositivosComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  constructor(
    private breakpointObserver: BreakpointObserver
  ) {}
  ngOnInit(): void {
  }

}
