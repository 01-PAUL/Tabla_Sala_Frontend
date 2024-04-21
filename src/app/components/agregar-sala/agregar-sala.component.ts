import { Component, OnInit } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import { SalaService } from '../../services/sala.service';
import { Usuario } from '../../models/usuario.model';
import { Sala } from '../../models/sala.model';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],
  selector: 'app-agregar-sala',
  templateUrl: './agregar-sala.component.html',
  styleUrls: ['./agregar-sala.component.css']
})
export class AgregarSalaComponent{

  lstTipo: DataCatalogo[] = [];
  lstSede: DataCatalogo[] = [];
  lstEstado: DataCatalogo[] = [];

  objSala: Sala ={
    numero: "",
    piso: 0,
    numAlumnos : 0,
    recursos: "",
    tipoSala:{
        idDataCatalogo:-1
    },
    sede:{
      idDataCatalogo:-1
    },
    estadoReserva:{
      idDataCatalogo:-1
  }
  }
  objUsuario: Usuario = {} ;

  constructor(private utilService: UtilService, 
              private tokenService: TokenService,
              private salaService: SalaService) { 

          this.utilService.listaTipoSala().subscribe(
                x =>  this.lstTipo = x
          );
          this.utilService.listaSede().subscribe(
            x =>  this.lstSede = x
          );
          this.utilService.listaEstadoReserva().subscribe(
            x =>  this.lstEstado = x
          );
          this.objUsuario.idUsuario = tokenService.getUserId();
      }
      registra(){
        this.objSala.usuarioActualiza = this.objUsuario;
        this.objSala.usuarioRegistro = this.objUsuario;
        this.salaService.registrar(this.objSala).subscribe(
          x=>{
            Swal.fire({
              icon: 'info',
              title: 'Resultado del Registro',
              text: x.mensaje,
            })
          },
        );
  }
  

}
