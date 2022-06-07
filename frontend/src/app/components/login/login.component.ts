import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user;
  public token;
  public identity;
  public data_error;

  constructor(
    private _userservice: UserService,
    private _router: Router

  ) {
      this.user = new User('','','','','')
      this.identity=this._userservice.getIdentity();
   }

  ngOnInit(): void {
    if (this.identity){
      this._router.navigate(['ventas']);
    }
  }

  close_alert (){
    this.data_error = '';
  }

  login(loginForm){
    if(loginForm.valid){
        this._userservice.login(this.user).subscribe(
          response=>{
            console.log(this.user)
            this.token = response.jwt;
            localStorage.setItem('token',this.token);
            
            this._userservice.login(this.user,true).subscribe(
              response=>{
                localStorage.setItem('identity',JSON.stringify(response.user));
                this._router.navigate(['ventas']);
              },
              error=>{
            
              }
            )

          },
          error=>{
              console.log(<any>error.error.error);
              this.data_error = error.error.error;
          }
        )
        } else {

    }
  }

}
