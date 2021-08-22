import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/TarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';


@Component({
  selector: 'app-crear-tarjeta',
  templateUrl: './crear-tarjeta.component.html',
  styleUrls: ['./crear-tarjeta.component.scss']
})
export class CrearTarjetaComponent implements OnInit {
  form: FormGroup;
  loading = false ; 
  titulo = 'Agregar Tarjeta' ; 
  id: string | undefined ; 

  constructor(private fb: FormBuilder, private _tarjetaService: TarjetaService , private toastr :ToastrService ) {
    this.form = this.fb.group({
      numeroTarjeta: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      titular: ['', Validators.required],
      fechaExpiracion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    })
  }

  ngOnInit(): void {
    this._tarjetaService.getTarjetaEdit().subscribe(data => {
      //console.log(data);
      this.id = data.id; 
      this.titulo = 'Editar Tarjeta' ;  
      this.form.patchValue({
        titular: data.titular,
        numeroTarjeta: data.numeroTarjeta,
        fechaExpiracion: data.fechaExpiracion,
        cvv: data.cvv,

      })
    })
  }

  guardarTarjeta() {

    if (this.id === undefined) {
      //Creamos una nueva tarjeta 
        this.agregarTarjeta(); 
    } else {
      //Editamos una tarjeta 
      this.editarTarjeta(this.id) ; 
    }
    
  }

  agregarTarjeta(){
    const TARJETA: TarjetaCredito = {
      titular: this.form.value.titular,
      numeroTarjeta: this.form.value.numeroTarjeta,
      fechaExpiracion: this.form.value.fechaExpiracion,
      cvv: this.form.value.cvv,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }

    this.loading = true ; 

    this._tarjetaService.guardarTarjeta(TARJETA).then(() => {
      this.loading = false ; 
      console.log('Tarjeta registrada correctamente ...');
      this.toastr.success('La tarjeta fue registrada con exito ' , 'Tarjeta registrada' )
      this.form.reset(); 
    }, error => {
      this.loading = false ; 
      this.toastr.error('Opss ... ocurio un error ' , 'Error')
      console.log(error);
    });
  }

  editarTarjeta(id: string){
    const TARJETA: any = {
      titular: this.form.value.titular,
      numeroTarjeta: this.form.value.numeroTarjeta,
      fechaExpiracion: this.form.value.fechaExpiracion,
      cvv: this.form.value.cvv,
      fechaActualizacion: new Date()
    }

    this.loading = true ; 
    this._tarjetaService.editarTarjeta(id, TARJETA).then(() => {
      this.loading = false; 
      this.titulo = 'Agregar Tarjeta' ; 
      this.form.reset() ; 
      this.id = undefined; 
      this.toastr.info('La Tarjeta Fue Actualizada Con Exito!' , 'Registro Actualizado') ; 
    }, error => {
      console.log(error)
    } )

  }

}
