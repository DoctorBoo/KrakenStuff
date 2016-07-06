"use strict";
/*
 * GET home page.
 */
var express = require('express');
require('reflect-metadata');
var myTicker_component_1 = require('../app/myTicker.component');
var myticker_krakenservice_1 = require('../service/myticker.krakenservice');
function index(req, res) {
    var service = new myticker_krakenservice_1.MytickerService();
    var component = new myTicker_component_1.MYTickerComponent(service);
    var list;
    var subscription = component.getAllTicks().subscribe(function (l) {
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
//# sourceMappingURL=index.js.map