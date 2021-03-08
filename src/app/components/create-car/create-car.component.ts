import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';

import { CarService } from '../services/car.service';

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.css']
})
export class CreateCarComponent implements OnInit {
  
  createCar: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Agregar Auto';

  constructor(private fb: FormBuilder,
    private carService: CarService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) {
    this.createCar = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      color: ['', Validators.required],
      patent: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
  }

  ngOnInit(): void {
    this.isEdit();
  }

  addEditCar() {
    this.submitted = true;

    if (this.createCar.invalid) {
      return;
    }

    if (this.id === null) {
      this.addCar();
    } else {
      this.editCar(this.id);
    }

  }

  addCar() {
    
    const car: any = {
      brand: this.createCar.value.brand,
      model: this.createCar.value.model,
      color: this.createCar.value.color,
      patent: this.createCar.value.patent,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this.carService.saveCard(car).then(() => {
      this.toastr.success('El auto fue registrado con exito!', 'Auto registrado', {
        positionClass: 'toast-bottom-right'
        
      });
      this.createCar.reset();
      this.loading = false;
      this.router.navigate(['/car-list']);
    }).catch(error => {
      console.log(error);
      this.loading = false;
      this.toastr.error('Opps.. ocurrio un error', 'Error');
      
    })
  }

  editCar(id: string) {

    const car: any = {
      brand: this.createCar.value.brand,
      model: this.createCar.value.model,
      color: this.createCar.value.color,
      patent: this.createCar.value.patent,      
      fechaActualizacion: new Date()
    }

    this.loading = true;

    this.carService.upgradeCar(id, car).then(() => {
      this.loading = false;
      this.toastr.info('El auto fue modificado con exito', 'Auto modificado', {
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/car-list']);
    })
  }


  isEdit() {
    
    
    if (this.id !== null) {
      this.titulo = 'Editar auto'
      this.loading = true;
      this.carService.getCar(this.id).subscribe(data => {
        this.loading = false;
        this.createCar.setValue({
          brand: data.payload.data()['brand'],
          model: data.payload.data()['model'],
          color: data.payload.data()['color'],
          patent: data.payload.data()['patent'],
        })
      })
    }
  }
}
