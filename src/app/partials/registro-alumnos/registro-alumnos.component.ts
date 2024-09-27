import { Component, Input, OnInit } from '@angular/core';
import { AlumnosService } from 'src/app/services/alumnos.service';
declare var $:any;

@Component({
  selector: 'app-registro-alumnos',
  templateUrl: './registro-alumnos.component.html',
  styleUrls: ['./registro-alumnos.component.scss']
})

// como ya tenemos la idea  basica del admin solo es darle formato a el maestro y de esta forma ir desarrollando el resto del componente.
// en varias partes se usaran las ismas variables para facilitar la lectura y mantenimiento del codigo.
export class RegistroAlumnosComponent implements OnInit{
  @Input() rol: string = "";
  @Input() datos_user: any = {};

  //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  public alumno:any = {};
  public errors:any={};
  public editar:boolean = false;

  constructor(
    private alumnosService: AlumnosService // Este es un servicio que contiene las funciones para validar y registrar alumnos
  ){}

  ngOnInit(): void {
    this.alumno = this.alumnosService.esquemaAlumno();
    // if(this.datos_user.rol == "alumno"){
    //   this.editar = true;
    // }
    console.log("Datos del alumno: ", this.alumno);
  }
   //Funciones para password
   showPassword()
   {
     if(this.inputType_1 == 'password'){
       this.inputType_1 = 'text';
       this.hide_1 = true;
     }
     else{
       this.inputType_1 = 'password';
       this.hide_1 = false;
     }
   }

   showPwdConfirmar()
   {
     if(this.inputType_2 == 'password'){
       this.inputType_2 = 'text';
       this.hide_2 = true;
     }
     else{
       this.inputType_2 = 'password';
       this.hide_2 = false;
     }
   }

   public regresar(){

   }

   public registrar(){
     //Validar
     this.errors = [];

     this.errors = this.alumnosService.validaralumno(this.alumno, this.editar);
     if(!$.isEmptyObject(this.errors)){
       return false;
     }

     //Validar la contraseña
     if(this.alumno.password == this.alumno.confirmar_password){
       //Entra a registrar

     }else{
       alert("Las contraseñas no coinciden");
       this.alumno.password="";
       this.alumno.confirmar_password="";
     }
   }

   public actualizar(){

   }
}
