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

    var subscription = component.getAllTicks(20000).subscribe(l => {
        console.log('view next...');
        list = l;
        res.render('ticker', { title: 'Express', year: new Date().getFullYear(), ticks: list });
    }, e => {
        console.log(e);
    }, () => {
        console.log('done')
    });    
};
export function bb(req: express.Request, res: express.Response) {
    let list: Tick[];
    
    try {
        //throw new DOMException();
        let ticks: any = req.query.ticks;
        let service: MytickerService = new MytickerService();
        let component: MYTickerComponent = new MYTickerComponent(service, ticks);
       

        var subscription = component.getAllTicks(ticks).subscribe(l => {
            console.log('view next...');
            list = l;
            res.render('bb', {
                title: 'Express', year: new Date().getFullYear(), ticks: list, coin: req.query.coin, bbParams: {
                    n: req.query.n,
                    k: req.query.k
                }
            });
        }, e => {
            console.log(e);
        }, () => {
            console.log('done')
        });
    } catch (e) {
        res.render('bb', {
            title: 'Express', year: new Date().getFullYear(), ticks: list, bbParams: {
                n: req.query.n,
                k: req.query.k
            }
        });
    }
};

