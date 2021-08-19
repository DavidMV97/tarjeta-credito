import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-crear-tarjeta',
  templateUrl: './crear-tarjeta.component.html',
  styleUrls: ['./crear-tarjeta.component.scss']
})
export class CrearTarjetaComponent implements OnInit {
  form: FormGroup; 

  constructor( private fb: FormBuilder ) {
    this.form = this.fb.group({
      numeroTarjeta:[ '' , [Validators.required , Validators.minLength(16), Validators.maxLength(16) ] ],
      titular:[ '' , Validators.required ],
      fechaExpiracion: [ '' , [Validators.required , Validators.minLength(5), Validators.maxLength(5) ] ],
      cvv: [ '' , [Validators.required , Validators.minLength(3), Validators.maxLength(3) ] ],
    })
   }

  ngOnInit(): void {
  }

  crearTarjeta(){
    console.log(this.form) ; 
  }

}
