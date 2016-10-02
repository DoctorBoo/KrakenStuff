"use strict";
require('reflect-metadata');
var myTicker_component_1 = require('../app/myTicker.component');
var myticker_krakenservice_1 = require('../service/myticker.krakenservice');
function index(req, res) {
    var service = new myticker_krakenservice_1.MytickerService();
    var component = new myTicker_component_1.MYTickerComponent(service);
    var list;
    var subscription = component.getAllTicks(10).subscribe(function (l) {
        console.log('view next...');
        list = l;
        res.render('ticker', { title: 'Express', year: new Date().getFullYear(), ticks: list });
    }, function (e) {
        console.log(e);
    }, function () {
        console.log('done');
    });
}
exports.index = index;
;
function bb(req, res) {
    var list;
    try {
        //throw new DOMException();
        var ticks = req.query.ticks;
        var service = new myticker_krakenservice_1.MytickerService();
        var component = new myTicker_component_1.MYTickerComponent(service, ticks);
        var subscription = component.getAllTicks(ticks).subscribe(function (l) {
            console.log('view next...');
            list = l;
            res.render('bb', {
                title: 'Express', year: new Date().getFullYear(), ticks: list, coin: req.query.coin, bbParams: {
                    n: req.query.n,
                    k: req.query.k
                }
            });
        }, function (e) {
            console.log(e);
        }, function () {
            console.log('done');
        });
    }
    catch (e) {
        res.render('bb', {
            title: 'Express', year: new Date().getFullYear(), ticks: list, bbParams: {
                n: req.query.n,
                k: req.query.k
            }
        });
    }
}
exports.bb = bb;
;
//# sourceMappingURL=index.js.map