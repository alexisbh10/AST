import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { global } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.css']
})
export class UserIndexComponent implements OnInit {

  public url;
  public users;
  public p = 1;
  public identity;

  constructor(
    private _userService: UserService,
    private _route: Router
  ) {
    this.url = global.url;
    this.identity=this._userService.getIdentity();
   }

  ngOnInit(): void {
    if(this.identity.role === 'ADMIN'){
      this._userService.get_users().subscribe(
        response=>{
          this.users=response.users;
          console.log(response)
        },
        error=>{
  
        }
      )
    } else {
      this._route.navigate(['dashboard'])
    }
    
  }

}
