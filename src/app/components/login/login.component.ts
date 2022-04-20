import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  logginIn: boolean = false;

  constructor(private _formBuilder: FormBuilder, private _userService: UserService, private _tokenService: TokenService, private _router: Router) { 
    this.loginForm = this._formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    }); 
  }

  ngOnInit(): void {
  }

  public async login(): Promise<void>{
    this.logginIn = true;
    this.loginForm.disable();
    let logUser = new User('','',this.loginForm.get('email')?.value, this.loginForm.get('password')?.value);
    try {
      let response: any = await this._userService.login(logUser);
      let user = new User(response.user.id, response.user.name, response.user.email, '');
      this._tokenService.saveUser(user);
      this._tokenService.saveToken(response.token);
      this._tokenService.emitLogin();
      this._router.navigate(['bienvenida']);
    } catch(error: any){
      this.logginIn = false;
      this.loginForm.enable();
      Swal.fire({
        icon: 'error',
        text: error.error.message ? error.error.message : 'No se pudo iniciar sesion. Intentelo de nuevo. Si sigue fallando, comuniquese con un administrador.'
      });
    }
  }

}
