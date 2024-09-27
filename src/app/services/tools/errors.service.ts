import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  public generic: string;
  public required: string;
  public numeric: string;
  public betweenDate: string;
  public email: string;
  public passwordMismatch: string;
  public isValidDate: string;

  // en esta parte agrega el passwordMismatch,isValidDate para que de esta forma muestre el mensjae de errr
  constructor() {
    this.generic = 'Favor de verificar el tipo de dato introducido no es válido';
    this.required = 'Campo requerido';
    this.numeric = 'Solo se aceptan valores numéricos';
    this.betweenDate = 'La fecha debe estar entre el rango permitido';
    this.email = 'Favor de introducir un correo con el formato correcto';
    this.passwordMismatch = 'Las contraseñas no coinciden';
    this.isValidDate = 'La fecha es inválida';

   }

   between(min: any, max: any) {
    return 'El valor introducido debe de ser entre ' + min + ' y ' + max;
  }

  max(size: any) {
    return 'Se excedió la longitud del campo aceptada: ' + size;
  }

  min(size: any) {
    return 'El campo no cumple la longitud aceptada: ' + size;
  }
  dateBetween(min: Date, max: Date): string {
    return `La fecha debe estar entre el ${min.toLocaleDateString()} y el ${max.toLocaleDateString()}.`;
  }


}
