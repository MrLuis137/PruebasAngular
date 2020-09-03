import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { promise } from 'protractor';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos: Producto[]= [];
  productosFiltrado: Producto[] = [];
  cargando = true;

  constructor(private http: HttpClient) {
    this.cargarProductos();
   }

   private cargarProductos(){

    //genera una promesa
    return new Promise((resolve, reject) =>{
      this.http.get("https://sandboxpruebas.firebaseio.com/productos_idx.json")
    .subscribe((res: Producto[]) =>{
      this.productos = res;
      this.cargando = false;
      //indica que la promesa se ha resuelto
      resolve();
     });
    });

     
   }

   public getProducto(id:string){
     
     return this.http.get(`https://sandboxpruebas.firebaseio.com/productos/${ id }.json`);

   }

   public buscarProducto(termino:string){
     this.productosFiltrado = [];
    if(this.productos.length === 0){

      //  FUNCIÓN ASINCRONA
      this.cargarProductos().then( () => {
        this.filtrarProductos(termino);
      });
    }
    else{
      this.filtrarProductos(termino);
    }
    console.log(this.productosFiltrado)
   }
   
  private filtrarProductos(termino:string){
    termino = termino.toLocaleLowerCase();
    this.productos.forEach(prod =>{
      const tituloLow = prod.titulo.toLocaleLowerCase();
      if(prod.categoria.indexOf(termino) >= 0 || tituloLow.indexOf(termino) >= 0){
        this.productosFiltrado.push(prod);
      }
    });
  }
} 
