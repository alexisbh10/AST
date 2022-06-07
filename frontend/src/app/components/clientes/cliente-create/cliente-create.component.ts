import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  public cliente;
  public success_message;

  constructor(
    private _clienteService: ClienteService
  ) { 
    this.cliente= new Cliente('','','','',1);
  }

  ngOnInit(): void {
  }

  onSubmit(clienteForm){
    if (clienteForm.valid){
      this._clienteService.insert_cliente({
        nombre: clienteForm.value.nombre,
        dni: clienteForm.value.dni,
        correo: clienteForm.value.correo
      }).subscribe(
        response=>{
          this.success_message = 'Se ha registrado correctamente.'
        },
        error=>{

        }
      )
    }
  }

  success_alert(){
    this.success_message='';
  }

}
