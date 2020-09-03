import { Component, OnInit } from '@angular/core';
import { InfoPaginaService } from '../../services/info-pagina.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public _info: InfoPaginaService, private router:Router) {

   }

   buscarProducto(termino: string){
     if(termino.length < 1){
       return;
     }
     this.router.navigate(['/search', termino])
   }

  ngOnInit(): void {
  }

}
