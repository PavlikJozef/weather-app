import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { ProductService } from 'src/app/demo/service/product.service';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './tabledemo.component.html',
    providers: [MessageService, ConfirmationService],
})
export class TableDemoComponent implements OnInit {


    conditions: any;

    hourlyValues: any; 

    hourlyValuesTime: any;
    hourlyValuesTemperature: any;
    hourlyValuesHumidity: any;


    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private customerService: CustomerService, private productService: ProductService, private http: HttpClient) {
        this.conditions = []
        this.hourlyValues = []
        this.hourlyValuesTime = []
        this.hourlyValuesTemperature = []
        this.hourlyValuesHumidity = []
     }

    ngOnInit() {
        // this.customerService.getWeatherConditions().then(conditions => {
        //     this.conditions = conditions;
        //     console.log(conditions)
        //     this.loading = false;
        // });
        this.loading = false;
        this.http.get('https://api.open-meteo.com/v1/forecast?latitude=51.5002&longitude=-0.1262&hourly=temperature_2m,relativehumidity_2m,weathercode,surface_pressure&temperature_unit=fahrenheit').subscribe((result:any) =>
        {
            this.conditions.data=result
            this.hourlyValues = result.hourly
            console.log(this.hourlyValues)

            this.hourlyValuesTime = this.conditions.data.hourly.time
            console.log(this.hourlyValuesTime)
        });

        
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
}
