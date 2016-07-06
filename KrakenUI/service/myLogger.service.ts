import {Injectable} from '@angular/core';


var MongoClient = require('mongodb').MongoClient;

@Injectable()
export class MYLoggerService {
    static logException (e:any) {
        try {
            console.log(e);
            //save error
            MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
                if (err) throw err;
                var collection = db.collection('log');
                collection.insert({ type: 'exceptionhandler', message: e.message, stack: e.stack, Creation: new Date() });
            });
        } catch (ex) {
            console.log(ex);
        }
    }
}