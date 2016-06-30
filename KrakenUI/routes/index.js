"use strict";
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
function about(req, res) {
    res.render('about', { title: 'About', year: new Date().getFullYear(), message: 'Your application description page' });
}
exports.about = about;
;
function contact(req, res) {
    res.render('contact', { title: 'Contact', year: new Date().getFullYear(), message: 'Your contact page' });
}
exports.contact = contact;
;
//# sourceMappingURL=index.js.map