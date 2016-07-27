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
var myLogger_service_1 = require('../service/myLogger.service');
var MongoClient = require('mongodb').MongoClient;
var KrakenClient = require('kraken-api');
var MytickerService = (function () {
    function MytickerService() {
        this.intervalIds = [];
    }
    MytickerService.prototype.setInterval = function (fn, ms) {
        var self = this;
        if (!self.intervalIds.length) {
            var intervalId = setInterval(fn, ms);
            self.intervalIds.push(intervalId);
        }
    };
    MytickerService.prototype.clearInterval = function () {
        var self = this;
        if (self.intervalIds.length)
            clearInterval(self.intervalIds.pop());
    };
    MytickerService.prototype.getAllTicks = function (tickCount) {
        var finished = false;
        var busy = false;
        var collection = [];
        var pair1 = 'XETHZEUR';
        var pair2 = 'XDAOZEUR';
        var pair3 = 'XETHXXBT';
        var pair4 = 'XXLMXXBT';
        var pair5 = 'XETCZEUR';
        console.log('polling...');
        var fn_ticker = function (observer, bsy) {
            if (!bsy) {
                try {
                    MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
                        var ethPairList = [];
                        var daoPairList = [];
                        var btcPairList = [];
                        var xlmPairList = [];
                        var etcPairList = [];
                        busy = true;
                        if (err)
                            throw err;
                        var max = 10;
                        var anyList;
                        tickCount = tickCount ? tickCount : 2000;
                        db.collection('kraken').count(function (q, c) {
                            var any = db.collection('kraken').find({}, { "pair.c": 1, Creation: 1, name: 1 })
                                .skip(c - tickCount).toArray(function (err, docs) {
                                console.dir(docs);
                                //Create business object tick
                                for (var i = 0; i < docs.length; i++) {
                                    var result = docs[i];
                                    var atick = { id: i, name: result.name, pair: result.pair, creation: result.Creation };
                                    var tick = atick;
                                    var options = {
                                        year: 'numeric', month: 'numeric', day: 'numeric',
                                        hour: 'numeric', minute: 'numeric', second: 'numeric',
                                        hour12: false
                                    };
                                    var localDate = result.Creation.toLocaleString('nl-NL', options);
                                    var ethListLen = ethPairList.length;
                                    var daoListLen = daoPairList.length;
                                    var btcListLen = btcPairList.length;
                                    var xlmListLen = xlmPairList.length;
                                    var etcListLen = etcPairList.length;
                                    tick.creationAsString = localDate;
                                    var existsEth = ethPairList.length > 0 &&
                                        (ethPairList && ethPairList[ethListLen - 1] && ethPairList[ethListLen - 1].creation !== atick.creation &&
                                            ethPairList[ethListLen - 1].pair["c"][0] == atick.pair['c'][0] &&
                                            ethPairList[ethListLen - 1].pair["c"][1] == atick.pair['c'][1]);
                                    var existsDao = daoPairList.length > 0 &&
                                        (daoPairList && daoPairList[daoListLen - 1] && daoPairList[daoListLen - 1].creation !== atick.creation &&
                                            daoPairList[daoListLen - 1].pair["c"][0] == atick.pair['c'][0] &&
                                            daoPairList[daoListLen - 1].pair["c"][1] == atick.pair['c'][1]);
                                    var existsBtc = btcPairList.length > 0 &&
                                        (btcPairList && btcPairList[btcListLen - 1] && btcPairList[btcListLen - 1].creation !== atick.creation &&
                                            btcPairList[btcListLen - 1].pair["c"][0] == atick.pair['c'][0] &&
                                            btcPairList[btcListLen - 1].pair["c"][1] == atick.pair['c'][1]);
                                    var existsXlm = xlmPairList.length > 0 &&
                                        (xlmPairList && xlmPairList[xlmListLen - 1] && xlmPairList[xlmListLen - 1].creation !== atick.creation &&
                                            xlmPairList[xlmListLen - 1].pair["c"][0] == atick.pair['c'][0] &&
                                            xlmPairList[xlmListLen - 1].pair["c"][1] == atick.pair['c'][1]);
                                    var existsEtc = etcPairList.length > 0 &&
                                        (etcPairList && etcPairList[etcListLen - 1] && etcPairList[etcListLen - 1].creation !== atick.creation &&
                                            etcPairList[etcListLen - 1].pair["c"][0] == atick.pair['c'][0] &&
                                            etcPairList[etcListLen - 1].pair["c"][1] == atick.pair['c'][1]);
                                    tick.bbDataEth = atick.name === pair1 && !existsEth ? [atick.creation, atick.pair['c'][0]] : null;
                                    tick.bbDataDAO = atick.name === pair2 && !existsDao ? [atick.creation, atick.pair['c'][0]] : null;
                                    tick.bbDataBtc = atick.name === pair3 && !existsBtc ? [atick.creation, atick.pair['c'][0]] : null;
                                    tick.bbDataXlm = atick.name === pair4 && !existsXlm ? [atick.creation, atick.pair['c'][0]] : null;
                                    tick.bbDataEtc = atick.name === pair5 && !existsEtc ? [atick.creation, atick.pair['c'][0]] : null;
                                    if (atick.name === pair1)
                                        ethPairList.push(tick); //collect all
                                    if (atick.name === pair2)
                                        daoPairList.push(tick); //collect all
                                    if (atick.name === pair3)
                                        btcPairList.push(tick); //collect all
                                    if (atick.name === pair4)
                                        xlmPairList.push(tick); //collect all
                                    if (atick.name === pair5)
                                        etcPairList.push(tick); //collect all
                                    collection.push(tick);
                                }
                                db.close();
                                observer.next(collection);
                                observer.complete();
                                finished = true;
                            });
                        });
                    });
                }
                catch (e) {
                    finished = true;
                    myLogger_service_1.MYLoggerService.logException(e);
                    observer.onError(e);
                }
                ;
            }
            else {
                console.log('busy retrieving...');
            }
            ;
        };
        var source = Observable_1.Observable.create(function (observer) {
            var id = setTimeout(function () {
                fn_ticker(observer, busy);
            }, 5);
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