export class Car {
    id?:string;
    brand: string;
    model: number;
    color: string;
    patent: string;

    constructor(brand: string, model: number, color: string, patent: string ) {
        this.brand = brand;
        this.model= model;
        this.color=color;
        this.patent=patent;
        
    }
    
}