import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-venta-index',
  templateUrl: './venta-index.component.html',
  styleUrls: ['./venta-index.component.css']
})
export class VentaIndexComponent implements OnInit {

  public identity;
  public ventas;
  public p = 1;

  constructor(
    private _userService: UserService,
    private _ventaService: VentaService,
    private _router: Router
  ) { 
    this.identity=this._userService.getIdentity();
  }

  ngOnInit(): void {
    if (this.identity){
      this._ventaService.get_ventas().subscribe(
        response=>{
          this.ventas = response.ventas;
          console.log(response)
        }, 
        error=>{
  
        }
      )
    } else {
      this._router.navigate(['']);
    }

  }

}
