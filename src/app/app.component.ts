import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'conectar-front';

  isLogged: boolean = false;
  subjectSync = new Subject<string>();
  observableSync = this.subjectSync.asObservable();

  constructor(private _router: Router, private _tokenService: TokenService) {
    try {
      this._tokenService.getUser();
      this._router.navigate(['bienvenida']);
      this.isLogged = true;
    } catch (error) {
      _router.navigate(['login']);
      this.isLogged = false;
    }
  }
}
