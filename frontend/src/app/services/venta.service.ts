import { Injectable } from '@angular/core';
import { global2 } from './global2';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  public url;

  constructor(
    private _http: HttpClient
  ) { 
    this.url = global2.url;
  }

  get_ventas():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'ventas', {headers: headers});
  }

  save_data(data):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url + 'venta/registrar',data, {headers: headers});
  }

  data_venta(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'venta/'+id, {headers: headers});
  }
}
