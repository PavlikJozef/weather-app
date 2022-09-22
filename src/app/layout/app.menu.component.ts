import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
                    { label: 'Hourly Conditions', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                    { label: 'Line Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
                    { label: 'Heat Index Calculator', icon: 'pi pi-fw pi-sort-numeric-up', routerLink: ['/uikit/formlayout'] },
                ]
            }
        ];
    }
}
