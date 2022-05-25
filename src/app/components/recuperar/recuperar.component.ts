import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CorreoService } from 'src/app/services/correo.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Contrasena } from './../../models/contrasena.model';
import { Usuario } from './../../models/usuario.model';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent implements OnInit {
  token : any;
  contrasena : Contrasena;
  correo : any;
  datosActualizar : Usuario;
  constructor(private route:ActivatedRoute, private correoService:CorreoService,private router: Router) {
    this.token='';
    this.contrasena = new Contrasena();
    this.datosActualizar = new Usuario();
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>
			{
				this.token = params.get('token');
        let dato={
          'token':this.token
        }
        this.correoService.decodificarMail(dato).subscribe((resCorreo: any) =>
        {
        console.log('Init',resCorreo);
        this.correo =resCorreo.correoProfesor;
        },err => console.error(err));
			});
  }
  cambiar(){
    if (this.contrasena.password == this.contrasena.passwordSecond) {
        this.datosActualizar.correo = this.correo;
        this.datosActualizar.password = this.contrasena.password;
        console.log(this.datosActualizar);
        this.correoService.cambiarContrasenya(this.datosActualizar).subscribe((resCorreo: any) =>
        {
        
        },err => console.error(err));
      this.router.navigateByUrl('');
    }
    else{
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Datos incorrectos`,
        });
    }
  }

}
