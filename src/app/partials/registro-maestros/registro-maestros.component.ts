import { MaestrosService } from './../../services/maestros.service';
import { Component, Input, OnInit } from '@angular/core';
declare var $:any;


// como ya tenemos la idea  basica del admin solo es darle formato a el maestro y de esta forma ir desarrollando el resto del componente.
// en varias partes se usaran las ismas variables para facilitar la lectura y mantenimiento del codigo.

@Component({
  selector: 'app-registro-maestros',
  templateUrl: './registro-maestros.component.html',
  styleUrls: ['./registro-maestros.component.scss']
})
export class RegistroMaestrosComponent implements OnInit{
  @Input() rol: string = "";
  @Input() datos_user: any = {};

  //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  public maestro:any = {};
  public errors:any={};
  public editar:boolean = false;

  //Para el select
  public areas: any[] = [
    {value: '1', viewValue: 'Desarrollo Web'},
    {value: '2', viewValue: 'Programación'},
    {value: '3', viewValue: 'Bases de datos'},
    {value: '4', viewValue: 'Redes'},
    {value: '5', viewValue: 'Matemáticas'},
    {value: '6', viewValue: 'Desarrollo móvil'},
    {value: '7', viewValue: 'Estructuras de datos'},
    {value: '8', viewValue: 'Horda en Gears'},
    {value: '9', viewValue: 'Ingeniería de Software'},
    {value: '10', viewValue: 'Técnico en Minecraft'},
  ];

  public materias:any[]= [
    {value: '1', nombre: 'Aplicaciones Web'},
    {value: '2', nombre: 'Programación 1'},
    {value: '3', nombre: 'Bases de datos'},
    {value: '4', nombre: 'Tecnologías Web'},
    {value: '5', nombre: 'Minería de datos'},
    {value: '6', nombre: 'Desarrollo móvil'},
    {value: '7', nombre: 'Estructuras de datos'},
    {value: '8', nombre: 'Administración de redes'},
    {value: '9', nombre: 'Ingeniería de Software'},
    {value: '10', nombre: 'Administración de S.O.'},
  ];

  constructor(
    private maestrosService: MaestrosService // Este es un servicio que contiene las funciones para validar y registrar maestros
  ){}

  ngOnInit(): void {
    this.maestro = this.maestrosService.esquemaMaestro();
    // if(this.datos_user.rol == "maestro"){
    //   this.editar = true;
    // }
    console.log("Datos del maestro: ", this.maestro);
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
    console.log("Datos del maestro: ", this.maestro);
     //Validar
     this.errors = [];

     this.errors = this.maestrosService.validarmaestro(this.maestro, this.editar);
     if(!$.isEmptyObject(this.errors)){
       return false;
     }

     //Validar la contraseña
     if(this.maestro.password == this.maestro.confirmar_password){
       //Entra a registrar

     }else{
       alert("Las contraseñas no coinciden");
       this.maestro.password="";
       this.maestro.confirmar_password="";
     }
   }

   public actualizar(){

   }

  public checkboxChange(event:any){
    console.log("Evento: ", event);
    if(event.checked){
      this.maestro.materias_json.push(event.source.value)
    }else{
      console.log(event.source.value);
      this.maestro.materias_json.forEach((materia, i) => {
        if(materia == event.source.value){
          this.maestro.materias_json.splice(i,1)
        }
      });
    }
    console.log("Array materias: ", this.maestro);
  }

  public revisarSeleccion(nombre: string){
    return false;
  }
}
