
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

    getAllTicks(): Observable<Tick[]>{
        let finished: boolean = false;
        let busy: boolean = false;
        let collection: any[] = [];
        
        console.log('polling...');

        let fn_ticker = (observer, bsy) => {
            if (!bsy) {
                try {
                    MongoClient.connect('mongodb://localhost:27017/test', (err, db) => {
                        let ethPairList: any[] = [];
                        let daoPairList: any[] = [];
                        busy = true;
                        if (err) throw err;

                        let max: number = 10;
                        var anyList: any[];
                        db.collection('kraken').count((q, c) => {
                            var any: any = db.collection('kraken').find({}, { "pair.c": 1, Creation: 1, name: 1 })
                                .skip(c - 12000).toArray(function (err, docs) {
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
                                        tick.creationAsString = localDate;
                                        let existsEth: boolean = ethPairList.length > 0 &&
                                            (ethPairList && ethPairList[ethListLen - 1] && ethPairList[ethListLen - 1].creation !== atick.creation && 
                                            ethPairList[ethListLen - 1].pair["c"][0] == atick.pair['c'][0]);
                                        let existsDao: boolean = daoPairList.length > 0 &&                                            
                                                (daoPairList && daoPairList[daoListLen - 1] && daoPairList[daoListLen - 1].creation !== atick.creation &&
                                                    daoPairList[daoListLen - 1].pair["c"][0] == atick.pair['c'][0]);

                                        tick.bbDataEth = atick.name === 'XETHZEUR' && !existsEth ? [atick.creation, atick.pair['c'][0]] : null;
                                        tick.bbDataDAO = atick.name === 'XDAOZEUR' && !existsDao ? [atick.creation, atick.pair['c'][0]] : null;

                                        if (atick.name === 'XETHZEUR') ethPairList.push(tick);//collect all
                                        if (atick.name === 'XDAOZEUR') daoPairList.push(tick);//collect all

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