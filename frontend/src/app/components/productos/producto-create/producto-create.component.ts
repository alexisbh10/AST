import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from '../../../models/producto';

interface HTMLInputEvent extends Event{
    target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-producto-create',
  templateUrl: './producto-create.component.html',
  styleUrls: ['./producto-create.component.css']
})
export class ProductoCreateComponent implements OnInit {

  public producto: Producto;
  public file!: File;
  public img_selected!: String | ArrayBuffer ;
  public categorias;
  public success_message;
  public error_message;

  constructor(
    private _productoService: ProductoService
  ) { 
    this.producto = new Producto('','','','',1,1,1,'',1);
  }

  ngOnInit(): void {
    this._productoService.get_categorias().subscribe(
      response=>{
        this.categorias=response.categorias;
        console.log(response.categorias)
      },
      error=>{

      })
  }

  success_alert(){
    this.success_message='';
  }

  error_alert(){
    this.error_message='';
  }

  onSubmit(productoForm){
    if(productoForm.valid){
      console.log(productoForm.value)
      this._productoService.insert_producto({
        titulo: productoForm.value.titulo,
        descripcion: productoForm.value.descripcion,
        imagen: this.file,
        precio_compra: productoForm.value.precio_compra,
        precio_venta: productoForm.value.precio_venta,
        stock: productoForm.value.stock,
        idcategoria: productoForm.value.idcategoria,
        puntos: productoForm.value.puntos 
      }).subscribe(
        response => {
          console.log(productoForm.value)

          this.success_message = 'Se ha registrado el producto correctamente';
          this.producto = new Producto('','','','',1,1,1,'',1);
          this.img_selected='../../../../assets/img/default.jpg';
        },
        error=>{

        }
      )

    } else {
      this.error_message = 'Complete correctamente el formulario'
      console.log("Error en el formulario")

    }

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
}
