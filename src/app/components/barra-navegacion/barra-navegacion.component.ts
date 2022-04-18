import { Component, Input, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.scss']
})
export class BarraNavegacionComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    @Input() menuShow: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver, private _tokenService: TokenService, private _userService: UserService, private _router: Router) {
    this._tokenService.loginObservable().subscribe({
      next: (value) => (this.menuShow = value),
    });
  }

  logout() {
    this.menuShow = false;
    this._tokenService.signOut();
    this._userService.logout();
    this._router.navigate(['login']);
  }

}
