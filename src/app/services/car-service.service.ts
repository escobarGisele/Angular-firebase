import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject , Observable} from 'rxjs';

import {Car} from '../models/Car'
@Injectable({
  providedIn: 'root'
})
export class CarServiceService {
  private car_ = new Subject<any>();
  
  constructor(private firestore: AngularFirestore) {}
   saveCar(car : Car): Promise<any> {
    return this.firestore.collection('car').add(car);
  }
//obtener
  getCars(): Observable<any> {
    return this.firestore.collection('car', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }
//eliminar
  deleteCar(id: string): Promise<any> {
    return this.firestore.collection('car').doc(id).delete();
  }
//edit
  editCar(id: string, car: any): Promise<any> {
    return this.firestore.collection('car').doc(id).update(car);
  }

  addOrEditCar(car: Car) {
    this.car_.next(car);
  }

  getCarEdit(): Observable<Car> {
    return this.car_.asObservable();
  }

}
