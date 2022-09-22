import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './charts.component.html'
})
export class ChartsComponent implements OnInit, OnDestroy {

    lineData: any;

    barData: any;

    lineOptions: any;

    barOptions: any;

    subscription!: Subscription;

    conditions: any;

    hourlyValues: any; 

    hourlyValuesTime: any;
    hourlyValuesTemperature: any;
    hourlyValuesHumidity: any;

    constructor(public layoutService: LayoutService, private http: HttpClient) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            this.initCharts();
        });
        this.conditions = []
        this.hourlyValues = []
        this.hourlyValuesTime = []
        this.hourlyValuesTemperature = []
        this.hourlyValuesHumidity = []
    }

    ngOnInit() {

        this.http.get('https://api.open-meteo.com/v1/forecast?latitude=51.5002&longitude=-0.1262&hourly=temperature_2m,relativehumidity_2m,weathercode,surface_pressure&temperature_unit=fahrenheit').subscribe((result:any) =>
        {
            this.conditions.data=result
            this.hourlyValues = result.hourly

            this.hourlyValuesTime = this.conditions.data.hourly.time
            this.hourlyValuesTemperature = this.conditions.data.hourly.temperature_2m
            this.initCharts();
        });
    }

    initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.lineData = {
            labels:  this.hourlyValuesTime,
            datasets: [
                {
                    label: 'Temperature in °F',
                    data: this.hourlyValuesTemperature,
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: 1
                }
            ]
        };

        this.lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: [surfaceBorder],
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: [surfaceBorder],
                        drawBorder: false
                    }
                },
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
