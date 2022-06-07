import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-index',
  templateUrl: './cliente-index.component.html',
  styleUrls: ['./cliente-index.component.css']
})
export class ClienteIndexComponent implements OnInit {

  public clientes;
  public p = 1;

  constructor(
    private _clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this._clienteService.get_clientes().subscribe(
      response=>{
        this.clientes = response.clientes;
        console.log(this.clientes)
      }, 
      error=>{

      }
    )
  }

  eliminar (id){
    Swal.fire({
      title: '¿Estás seguro de eliminarlo?',
      text: "¡Eliminación!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '¡Registro eliminado!',
          'Ha sido eliminado correctamente.',
          'success'
        )
        this._clienteService.delete_cliente(id).subscribe(
          response=>{
            this._clienteService.get_clientes().subscribe(
              response=>{
                this.clientes=response.clientes;
              },
              error=>{

              }
            )
          },
          error=>{

          }
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'Se ha cancelado la solicitud',
          'error'
        )
      }
    })
  }

}
