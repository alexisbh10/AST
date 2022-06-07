import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  public user;
  public success_message;
  public identity;

  constructor(
    private _userService: UserService, 
    private _router: Router
  ) {
    this.user = new User('','','','','');
    this.identity= this._userService.getIdentity();
   }

  ngOnInit(): void {
    if (this.identity.role == 'ADMIN'){

    } else {
      this._router.navigate(['dashboard']);
    }
  }

  success_alert(){
    this.success_message='';
  }

  onSubmit(userForm){
    if (userForm.valid){
      this._userService.registrar({
        password: userForm.value.password,
        nombre: userForm.value.nombre,
        email: userForm.value.correo,
        role: userForm.value.role
      }).subscribe(
        response=>{
          this.user = new User('','','','','');
          this.success_message='El usuario se ha registrado con éxito.';
        },
        error=>{

        }
      )
    }

  }

}
