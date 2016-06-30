
import { Observable } from 'rxjs/Observable';
import {Component, OnInit} from '@angular/core';
import {MytickerService} from '../service/myticker.krakenservice'
import {Tick} from './myTick.component'

@Component({
    selector: 'myTicker',
    templateUrl: 'views/ticks.html',
    styleUrls: ['public/stylesheets/styling.css'],
    providers: [MytickerService]
})

export class MYTickerComponent implements OnInit {
    public Ticks: Tick[];
    constructor(private service: MytickerService) {       
    }

    public getAllTicks(): Observable<Tick[]> {
        return this.service.getAllTicks();
    }

    ngOnInit() {
        this.getAllTicks().subscribe(l => {
            console.log('component next...');
            this.Ticks = l;
        }, e => {
            console.log(e);
        }, () => {
            console.log('done')
        });;
    }
}