import { Component, OnInit } from '@angular/core';
import {Car} from '../../models/car'
import { ToastrService } from 'ngx-toastr';
import {CarService} from '../services/car.service';
@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars: any[] = [];
  constructor(private _carService: CarService, 
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCars();
  }
  getCars() {
    this._carService.getCars().subscribe(data => {
      this.cars = [];
      data.forEach((element: any) => {
        this.cars.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.cars);
    });
    
  
  }

  deleteCar(id: string) {
    this._carService.deleteCar(id).then(() => {
      console.log('auto eliminado con exito');
      this.toastr.error('El auto fue eliminado con exito', 'Registro eliminado!', {
        positionClass: 'toast-bottom-right'
      });
    }).catch(error => {
      console.log(error);
    })
  }

}
