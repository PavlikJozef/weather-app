import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../api/customer';

@Injectable()
export class CustomerService {

    customers: any;
    constructor(private http: HttpClient) { }

    // getWeatherConditions() {
    //     return this.http.get<any>('assets/demo/data/customers-large.json')
    //         .toPromise()
    //         .then(res => res as Customer[])
    //         .then(data => data);
    // }

    getWeatherConditions() {
    return this.http.get('https://api.open-meteo.com/v1/forecast?latitude=51.5002&longitude=-0.1262&hourly=temperature_2m,relativehumidity_2m,weathercode,surface_pressure&temperature_unit=fahrenheit').subscribe((result:any) =>
    {
        this.customers=result
    });
}
}
