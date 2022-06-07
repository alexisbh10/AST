import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { global } from 'src/app/services/global';
import Swal from 'sweetalert2'

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-producto-index',
  templateUrl: './producto-index.component.html',
  styleUrls: ['./producto-index.component.css']
})
export class ProductoIndexComponent implements OnInit {

public productos;
public url;
public filtro;
public categorias;
public titulo_cat;
public descripcion_cat;
public p = 1;
public producto_stock;
public producto_id;
public success_message;


  constructor(
    private _productoService: ProductoService
  ) { 
    this.url = global.url;
  }

  ngOnInit(): void {
    this._productoService.get_productos('').subscribe(
      response=>{
        this.productos= response.productos;
      },
      error=>{

      }
    )

    this._productoService.get_categorias().subscribe(
      response=>{
        this.categorias=response.categorias;
      },
      error=>{

      }
    )
  }

  search(searchForm){
    this._productoService.get_productos(searchForm.value.filtrotxt).subscribe(
      response =>{
        this.productos = response.productos;
      },
      error=>{

      }
    );
    
  }

  save_cat(categoriaForm){
    console.log(categoriaForm)

    if (categoriaForm.valid){
      console.log(categoriaForm)
      this._productoService.insert_categoria({
        titulo: categoriaForm.value.titulocat,
        descripcion: categoriaForm.value.descripcioncat
      }).subscribe(
        response=>{
          this._productoService.get_categorias().subscribe(
            response=>{
              this.categorias=response.categorias;
              $('#modal-save-categoria').modal('hide');
            },
            error=>{

            }
          )
        },
        error=>{

        }
      )
    } else {

    }
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
        this._productoService.delete_producto(id).subscribe(
          response=>{
            this._productoService.get_productos('').subscribe(
              response=>{
                this.productos=response.productos;
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

  get_id(id){
    this.producto_id = id;
  }

  success_alert(){
    this.success_message='';
  }

  aumentar_stock(stockForm){
    if(stockForm.valid){
      console.log(typeof(stockForm.value.producto_stock))
      if(this.producto_id){
       this._productoService.stock_producto({
         _id:this.producto_id,
         stock:stockForm.value.productostock
       }).subscribe(
         response=>{
          this.success_message = 'Se ha aumentado el stock correctamente';
          this._productoService.get_productos('').subscribe(
            response=>{
              this.productos=response.productos;
              $('.modal').modal('hide');

            },
            error=>{

            }
          )
         },
         error=>{

         }
       )
      }
    } else {

    }
  }

}
