
import { Observable } from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {Tick} from '../app/myTick.component';
import {MYLoggerService} from '../service/myLogger.service';
var MongoClient = require('mongodb').MongoClient;
var KrakenClient = require('kraken-api');

@Injectable()
export class MytickerService {
    private intervalIds: number[] = [];

    setInterval(fn, ms) {
        var self = this;
        if (!self.intervalIds.length) {
            var intervalId = setInterval(fn, ms);
            self.intervalIds.push(intervalId);
        }
    }
    clearInterval () {
        var self = this;
        if (self.intervalIds.length)
            clearInterval(self.intervalIds.pop());
    }

    getAllTicks(tickCount?:number): Observable<Tick[]>{
        let finished: boolean = false;
        let busy: boolean = false;
        let collection: any[] = [];
        let pair1:string = 'XETHZEUR';
        let pair2: string = 'XDAOZEUR';
        let pair3: string = 'XETHXXBT';
        let pair4: string = 'XXLMXXBT';
        let pair5: string = 'XETCZEUR';

        console.log('polling...');

        let fn_ticker = (observer, bsy) => {
            if (!bsy) {
                try {
                    MongoClient.connect('mongodb://localhost:27017/test', (err, db) => {
                        let ethPairList: any[] = [];
                        let daoPairList: any[] = [];
                        let btcPairList: any[] = [];
                        let xlmPairList: any[] = [];
                        let etcPairList: any[] = [];

                        busy = true;
                        if (err) throw err;

                        let max: number = 10;
                        var anyList: any[];
                        tickCount = tickCount ? tickCount : 2000;
                        db.collection('kraken').count((q, c) => {
                            var any: any = db.collection('kraken').find({}, { "pair.c": 1, Creation: 1, name: 1 })
                                .skip(c - tickCount).toArray(function (err, docs) {
                                    console.dir(docs);

                                    //Create business object tick
                                    for (let i: number = 0; i < docs.length; i++) {
                                        let result: any = docs[i];
                                        let atick: Tick = { id: i, name: result.name, pair: result.pair, creation: result.Creation };
                                        let tick: any = atick;
                                        var options = {
                                            year: 'numeric', month: 'numeric', day: 'numeric',
                                            hour: 'numeric', minute: 'numeric', second: 'numeric',
                                            hour12: false
                                        };
                                        let localDate: string = result.Creation.toLocaleString('nl-NL', options);
                                        let ethListLen: number = ethPairList.length;
                                        let daoListLen: number = daoPairList.length;
                                        let btcListLen: number = btcPairList.length;
                                        let xlmListLen: number = xlmPairList.length;
                                        let etcListLen: number = etcPairList.length;

                                        tick.creationAsString = localDate;
                                        let existsEth: boolean = ethPairList.length > 0 &&
                                            (ethPairList && ethPairList[ethListLen - 1] && ethPairList[ethListLen - 1].creation !== atick.creation && 
                                            ethPairList[ethListLen - 1].pair["c"][0] == atick.pair['c'][0] &&
                                            ethPairList[ethListLen - 1].pair["c"][1] == atick.pair['c'][1]);
                                        let existsDao: boolean = daoPairList.length > 0 &&                                            
                                                (daoPairList && daoPairList[daoListLen - 1] && daoPairList[daoListLen - 1].creation !== atick.creation &&
                                                daoPairList[daoListLen - 1].pair["c"][0] == atick.pair['c'][0] &&
                                                daoPairList[daoListLen - 1].pair["c"][1] == atick.pair['c'][1]);
                                        let existsBtc: boolean = btcPairList.length > 0 &&
                                                (btcPairList && btcPairList[btcListLen - 1] && btcPairList[btcListLen - 1].creation !== atick.creation &&
                                                btcPairList[btcListLen - 1].pair["c"][0] == atick.pair['c'][0] &&
                                                btcPairList[btcListLen - 1].pair["c"][1] == atick.pair['c'][1]);
                                        let existsXlm: boolean = xlmPairList.length > 0 &&
                                            (xlmPairList && xlmPairList[xlmListLen - 1] && xlmPairList[xlmListLen - 1].creation !== atick.creation &&
                                                xlmPairList[xlmListLen - 1].pair["c"][0] == atick.pair['c'][0] &&
                                                xlmPairList[xlmListLen - 1].pair["c"][1] == atick.pair['c'][1]);
                                        let existsEtc: boolean = etcPairList.length > 0 &&
                                            (etcPairList && etcPairList[etcListLen - 1] && etcPairList[etcListLen - 1].creation !== atick.creation &&
                                                etcPairList[etcListLen - 1].pair["c"][0] == atick.pair['c'][0] &&
                                                etcPairList[etcListLen - 1].pair["c"][1] == atick.pair['c'][1]);


                                        tick.bbDataEth = atick.name === pair1 && !existsEth ? [atick.creation, atick.pair['c'][0]] : null;
                                        tick.bbDataDAO = atick.name === pair2 && !existsDao ? [atick.creation, atick.pair['c'][0]] : null;
                                        tick.bbDataBtc = atick.name === pair3 && !existsBtc ? [atick.creation, atick.pair['c'][0]] : null;
                                        tick.bbDataXlm = atick.name === pair4 && !existsXlm ? [atick.creation, atick.pair['c'][0]] : null;
                                        tick.bbDataEtc = atick.name === pair5 && !existsEtc ? [atick.creation, atick.pair['c'][0]] : null;

                                        if (atick.name === pair1) ethPairList.push(tick);//collect all
                                        if (atick.name === pair2) daoPairList.push(tick);//collect all
                                        if (atick.name === pair3) btcPairList.push(tick);//collect all
                                        if (atick.name === pair4) xlmPairList.push(tick);//collect all
                                        if (atick.name === pair5)
                                            etcPairList.push(tick);//collect all

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
                    MYLoggerService.logException(e);
                    observer.onError(e);
                };
            } else {
                console.log('busy retrieving...');
            };
        };

        var source = Observable.create(function (observer) {
            var id = setTimeout(() => {
                fn_ticker(observer, busy);

            }, 5);
            console.log('started');

            return () => {
                console.log('disposal called');               
                clearTimeout(id);
            }
        });

        return source;        
    }
}