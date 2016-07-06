/*
 * GET home page.
 */
import express = require('express');
import 'reflect-metadata';

import { Tick } from '../app/mytick.component'
import { MYTickerComponent } from '../app/myTicker.component'
import { MytickerService } from '../service/myticker.krakenservice'

export function index(req: express.Request, res: express.Response) {
    let service: MytickerService = new MytickerService();
    let component: MYTickerComponent = new MYTickerComponent(service);
    let list: Tick[];

    var subscription = component.getAllTicks().subscribe(l => {
        console.log('view next...');
        list = l;
        res.render('ticker', { title: 'Express', year: new Date().getFullYear(), ticks: list });
    }, e => {
        console.log(e);
    }, () => {
        console.log('done')
    });    
};
