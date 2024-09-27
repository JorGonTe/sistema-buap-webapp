import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidatorService } from './tools/validator.service';
import { ErrorsService } from './tools/errors.service';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
  ) { }

  // en todos los usuarios podremos eeste esquema el cual es el encargado de enviar y recibir la información
  public esquemaAlumno(){
    return {
      'rol':'',
      'clave_alumno': '',
      'first_name': '',
      'last_name': '',
      'email': '',
      'password': '',
      'confirmar_password': '',
      'telefono': '',
      'curp':'',
      'fechaN': '',
      'rfc': '',
      'edad': '',
      'ocupacion': ''
    }
  }
  //Validación para el formulario
  public validaralumno(data: any, editar: boolean){
    console.log("Validando alumno... ", data);

    // define la variable error
    let error: any = [];

    // validar el campo "clave_alumno"
    if(!this.validatorService.required(data["clave_alumno"])){
      error["clave_alumno"] = this.errorService.required;
    }

    // validar el campo "first_name"
    if(!this.validatorService.required(data["first_name"])){
      error["first_name"] = this.errorService.required;
    }

    // validar el campo "last_name"
    if(!this.validatorService.required(data["last_name"])){
      error["last_name"] = this.errorService.required;
    }

    // validar el campo "email" el cual debe de cumplir con el patrón de email y cierta longitud máxima
    if(!this.validatorService.required(data["email"])){
      error["email"] = this.errorService.required;
    }else if(!this.validatorService.max(data["email"], 40)){
      error["email"] = this.errorService.max(40);
    }else if (!this.validatorService.email(data['email'])) {
      error['email'] = this.errorService.email;
    }

    // en esta parte se hace la validacion de la contraseaña el primer y segundo if es para verificar que se ingreso una contraseña
    // el tercer if se encarga de verificar si las contraseas son iguales ademas de eso manda una alerta y borra dichos campos

    if (!editar) {
      // Validar que el campo "password" sea obligatorio
      if (!this.validatorService.required(data["password"])) {
        error["password"] = this.errorService.required;
      }

      // Validar que el campo "confirmar_password" sea obligatorio
      if (!this.validatorService.required(data["confirmar_password"])) {
        error["confirmar_password"] = this.errorService.required;
      }

      // Validar que las contraseñas coincidan (si ambas están presentes)
      if (data["password"] && data["confirmar_password"] && data["password"] !== data["confirmar_password"]) {
        error["confirmar_password"] = this.errorService.passwordMismatch;
        alert("Las contraseñas no coinciden");
        // Borrar el campo de confirmar contraseña
        data["confirmar_password"] = "";
        data["password"] = "";
      }
    }


    // if(!this.validatorService.required(data["fechaN"])){
    //   error["fechaN"] = this.errorService.required;
    // }

    // Validación de la fecha de nacimiento
    // en esta parte solo se verifica que se ingreso la fecha de no ser asi manda el error de requerido,
    // si la fecha es correcta se verifica que sea una fecha valida y que no sea depues de a la fecha actual

    if (!this.validatorService.required(data["fechaN"])) {
      error["fechaN"] = this.errorService.required;
    } else if (!this.validatorService.dateBetween(data["fechaN"], new Date(1900, 0, 1), new Date())) {
      error["fechaN"] = this.errorService.betweenDate;
      alert("La fecha debe estar entre el rango permitido");
        // Borrar el campo de confirmar contraseña
        data["fechaN"] = "";
    }

    // de igual forma se verifica que se igreso el curp , se define  los rangos de caracteres que deben de ser
    if(!this.validatorService.required(data["curp"])){
      error["curp"] = this.errorService.required;
    }else if(!this.validatorService.min(data["curp"], 18)){
      error["curp"] = this.errorService.min(18);
      alert("La longitud de caracteres deL CURP es menor, deben ser 18");
    }else if(!this.validatorService.max(data["curp"], 18)){
      error["curp"] = this.errorService.max(18);
      alert("La longitud de caracteres deL CURP es mayor, deben ser 18");
    }

    // de igual forma se verifica que se igreso el rfc , se define  los rangos de caracteres que deben de ser

    if(!this.validatorService.required(data["rfc"])){
      error["rfc"] = this.errorService.required;
    }else if(!this.validatorService.min(data["rfc"], 12)){
      error["rfc"] = this.errorService.min(12);
      alert("La longitud de caracteres deL RFC es menor, deben ser 12");
    }else if(!this.validatorService.max(data["rfc"], 13)){
      error["rfc"] = this.errorService.max(13);
      alert("La longitud de caracteres deL RFC es mayor, deben ser 13");
    }

     // de igual forma se verifica que se igreso la edad  , se define  el ingreso de solo  numeros
    if(!this.validatorService.required(data["edad"])){
      error["edad"] = this.errorService.required;
    }else if(!this.validatorService.numeric(data["edad"])){
      alert("El formato de la edad es de solo números");
    }

     // de igual forma se verifica que se igreso EL TELEFONO  , se define  el ingreso de solo  numeros

    if(!this.validatorService.required(data["telefono"])){
      error["telefono"] = this.errorService.required;
    }else if(!this.validatorService.numeric(data["edad"])){
      alert("El formato del teléfono es de solo números");
    }

    // validar el campo "ocupacion"
    if(!this.validatorService.required(data["ocupacion"])){
      error["ocupacion"] = this.errorService.required;
    }

    //Return arreglo
    return error;
  }
}
