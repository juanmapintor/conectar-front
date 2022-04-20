import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'app-home-personas',
  templateUrl: './home-personas.component.html',
  styleUrls: ['./home-personas.component.scss'],
})
export class HomePersonasComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {}
}
