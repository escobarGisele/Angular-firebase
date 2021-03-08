import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private car_ = new Subject<any>();
  
  constructor(private firestore: AngularFirestore) {}
  saveCard(car: Car): Promise<any> {
    return this.firestore.collection('cars').add(car);
  }

  getCars(): Observable<any> {
    return this.firestore.collection('cars', ref => ref.orderBy('fechaCreacion', 'desc')).snapshotChanges();
  }

  deleteCar(id: string): Promise<any> {
    return this.firestore.collection('cars').doc(id).delete();
  }

  getCar(id: string): Observable<any> {
    return this.firestore.collection('cars').doc(id).snapshotChanges();
  }

  upgradeCar(id: string, data:any): Promise<any> {
    return this.firestore.collection('cars').doc(id).update(data);
  }

}
