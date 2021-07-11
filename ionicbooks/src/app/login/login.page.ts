import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { NavController } from '@ionic/angular';
import { TokenService } from '../services/token.service';

import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';


// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
//     const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

//     return (invalidCtrl || invalidParent);
//   }
// }

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  error404;
  error501;
  user = {
    email: "",
    password: ""
  }
  
  constructor(private authService: AuthService, 
    private tokenService: TokenService, 
    private storage: Storage,
    public navCtrl: NavController,
    private router: Router) { }

  async ngOnInit() {
    await this.storage.create();
  }

logIn() {
  this.authService.logIn(this.user).subscribe(
    res => {
      this.tokenService.SetToken(res.token)
      this.tokenService.SetUser(JSON.stringify(res.user))
      this.router.navigate(['/tab/home'])
      // localStorage.setItem('token', res.token);
      // localStorage.setItem('user', JSON.stringify(res.user));
      

    },
    err => {
      console.log(err)
      if (err.status === 404) {
        this.error404 = err.status
      } else if (err.status === 501) {
        this.error501 = err.status
      }
    }
  )
  
    
  }

  
}
