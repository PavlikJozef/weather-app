import { Component } from '@angular/core';

@Component({
    templateUrl: './formlayout.component.html'
})
export class FormLayoutComponent {

    temperature!: number;
    temperateureAfterCheck!: number;
    humidity!: number;
    result!: number;
    lastValues: number[] = [];

    selectedState: any;

    dropdownItems = [
        { name: 'Celsius', code: '°C' },
        { name: 'Fahrenheit', code: '°F' },
    ];

    calculate() {
        this.temperatureValueValidation() != 0 && this.humidityValueValidation() ? this.result = this.heatIndexFormula() : this.result = 0
        this.displaylastFiveItems()
    }

    temperatureValueValidation() {
        if(this.selectedState.name === 'Celsius'){
            return this.temperature > 26.7 ? this.temperateureAfterCheck = this.temperatureConversion(this.temperature) : this.result = 0
        } else {
           return this.temperature > 80 ? this.temperateureAfterCheck = this.temperature : this.result = 0
        }
    }

    humidityValueValidation() {
        return this.humidity >= 0 && this.humidity <= 100
    }

    temperatureConversion(temperature: number) {
        return (9/5) * temperature + 32
    }

    heatIndexFormula() {
        return  Math.floor(-42.379 + (2.04901523 * this.temperateureAfterCheck) + (10.14333127 * this.humidity)
        - (0.22475541 * this.temperateureAfterCheck * this.humidity) - (6.83783 * (10 ** -3) * (this.temperateureAfterCheck ** 2))
        - (5.481717 * (10 ** -2) * (this.humidity ** 2)) + (1.22874 * (10 ** -3) * (this.temperateureAfterCheck ** 2) * this.humidity)
        + (8.5282 * (10 ** -4) * this.temperateureAfterCheck * (this.humidity ** 2)) - (1.99 * (10 ** -6) * (this.temperateureAfterCheck ** 2) * (this.humidity ** 2)))
    }

    displaylastFiveItems() {
        if (this.lastValues.length < 5 ){
            this.lastValues.unshift(this.result)
        } else {
            this.lastValues.pop()
            this.lastValues.unshift(this.result)
        }  
    }
}
