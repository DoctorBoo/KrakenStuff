import {Component, OnInit} from '@angular/core';
export class Tick {
    id: number;
    name: string;
    pair: any[];
    creation: Date;
}

@Component({
    selector: 'myTick',
    templateUrl: 'app/myTick.component.html',
    styleUrls: ['app/myTick.component.css']
})

export class MYTickComponent implements OnInit {

    constructor() {

    }

    ngOnInit() {

    }
}