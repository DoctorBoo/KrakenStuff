"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Observable_1 = require('rxjs/Observable');
var core_1 = require('@angular/core');
var MongoClient = require('mongodb').MongoClient;
var KrakenClient = require('kraken-api');
var MytickerService = (function () {
    function MytickerService() {
    }
    MytickerService.prototype.getAllTicks = function () {
        var finished = false;
        var busy = false;
        var collection = [];
        var fn = function (observer, bsy) {
            if (!bsy) {
                try {
                    MongoClient.connect('mongodb://192.168.178.21:27017/test', function (err, db) {
                        busy = true;
                        if (err)
                            throw err;
                        var max = 10;
                        var anyList;
                        var any = db.collection('kraken').find({}).limit(max).toArray(function (err, docs) {
                            console.dir(docs);
                            for (var i = 0; i < max; i++) {
                                var result = docs[i];
                                var tick = { id: i, name: result.name, pair: result.pair, creation: new Date(result.Creation.$date) };
                                collection.push(tick);
                            }
                            db.close();
                            observer.next(collection);
                            observer.complete();
                            finished = true;
                        });
                    });
                }
                catch (e) {
                    finished = true;
                    observer.onError(e);
                }
                ;
            }
        };
        var source = Observable_1.Observable.create(function (observer) {
            var id = setTimeout(function () {
                fn(observer, busy);
            }, 500);
            console.log('started');
            return function () {
                console.log('disposal called');
                clearTimeout(id);
            };
        });
        return source;
    };
    MytickerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MytickerService);
    return MytickerService;
}());
exports.MytickerService = MytickerService;
//# sourceMappingURL=myticker.krakenservice.js.map