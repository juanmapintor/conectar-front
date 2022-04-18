import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  logginIn: boolean = false;

  constructor(private _formBuilder: FormBuilder, private _userService: UserService, private _tokenService: TokenService, private _router: Router) { 
    this.loginForm = _formBuilder.group({
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
    } catch(error){
      console.error(error);
    }
  }

}
