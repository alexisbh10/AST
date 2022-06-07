import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { global } from 'src/app/services/global';
import { ProductoService } from 'src/app/services/producto.service';

interface HTMLInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.component.html',
  styleUrls: ['./producto-edit.component.css']
})
export class ProductoEditComponent implements OnInit {

  public producto;
  public id;
  public categorias;
  public url;
  public file!: File;
  public img_selected!: String | ArrayBuffer;
  public success_message;
  public error_message;


  constructor(
    private _route: ActivatedRoute,
    private _productoService: ProductoService
  ) {
     this.url = global.url;
   }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=> {
        this.id = params['id'];
        this._productoService.get_producto(this.id).subscribe(
          response=>{
            this.producto=response.producto;
            this._productoService.get_categorias().subscribe(
              response=>{
                this.categorias=response.categorias;
                console.log(response)
              },
              error=>{
        
              })
          },
          error=>{

          }
        )
        })
  }

  success_alert(){
    this.success_message='';
  }

  error_alert(){
    this.error_message='';
  }

  imgSelected(event: any){
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]){
      this.file = <File> target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.img_selected = reader.result!;
      reader.readAsDataURL(this.file);
      console.log(this.file)
    }
  }

  onSubmit(productoForm){
    if (productoForm.valid){
      this._productoService.update_producto({
        _id: this.id,
        titulo: productoForm.value.titulo,
        descripcion: productoForm.value.descripcion,
        imagen: this.file,
        precio_compra: productoForm.value.precio_compra,
        precio_venta: productoForm.value.precio_venta,
        idcategoria: productoForm.value.idcategoria,
        puntos: productoForm.value.puntos,
        img_name: this.producto.imagen,
      }).subscribe(
        response=>{
          console.log(response);
          this.success_message = 'Se ha actualizado el producto correctamente';
        },
        error=>{

        }

      )  
    } else {
      console.log('Error en los datos');
      this.error_message = 'Complete correctamente el formulario'
    }
  }

}
