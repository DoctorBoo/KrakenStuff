
import { Observable } from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {Tick} from '../app/myTick.component'
var MongoClient = require('mongodb').MongoClient;
var KrakenClient = require('kraken-api');

@Injectable()
export class MytickerService {
    getAllTicks(): Observable<Tick[]>{
        let finished: boolean = false;
        let busy: boolean = false;
        let collection: Tick[] = [];

        var fn = function (observer, bsy) {
            if (!bsy) {
                try {
                    MongoClient.connect('mongodb://192.168.178.21:27017/test', function (err: any, db: any) {
                        busy = true;
                        if (err) throw err;

                        let max: number = 10;
                        var anyList: any[];
                        var any: any = db.collection('kraken').find({}).limit(max).toArray(function (err, docs) {
                            console.dir(docs);
                            for (let i: number = 0; i < max; i++) {
                                let result: any = docs[i];
                                let tick: Tick = { id: i, name: result.name, pair: result.pair, creation: new Date(result.Creation.$date) };
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
                };
            }            
        };

        var source = Observable.create(function (observer) {
            var id = setTimeout(() => {
                fn(observer, busy);
            }, 500);
            console.log('started');

            return () => {
                console.log('disposal called');
                clearTimeout(id);
            }
        });

        return source;        
    }
}