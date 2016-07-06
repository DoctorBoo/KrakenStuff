
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
                    MongoClient.connect('mongodb://192.168.178.21:27017/test', (err, db) => {
                        busy = true;
                        if (err) throw err;

                        let max: number = 10;
                        var anyList: any[];
                        db.collection('kraken').count((q, c) => {
                            var any: any = db.collection('kraken').find({}, { "pair.c": 1, Creation: 1, name: 1 })
                                .skip(c - 6000).toArray(function (err, docs) {
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
                                        tick.creationAsString = localDate;
                                        tick.bbDataEth = atick.name === 'XETHZEUR' ? [atick.creation, atick.pair['c'][0]] : null;
                                        tick.bbDataDAO = atick.name === 'XDAOZEUR' ? [atick.creation, atick.pair['c'][0]] : null;
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