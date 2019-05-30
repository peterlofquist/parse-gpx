"use strict";

const xml2js = require('xml2js');
const fs = require('fs');
const parseTrack = require('./src/parseTrack');
const parseWay = require('./src/parseWay');

module.exports = (filename) => {

    return new Promise((res, rej) => {
        fs.readFile(filename,'utf8', (err, data) => {
            if(err) {
                rej(err);
                return;
            }

            let parser = new xml2js.Parser();
            parser.parseString(data, (err, xml) => {
                if(err) {
                    rej(err);
                } else {
                    if (!!xml.gpx.trk) {
                        res(parseTrack(xml.gpx.trk));
                    } else if (!!xml.gpx.rte) {
                        res(parseWay(xml.gpx.rte));
                    } else {
                        rej(Error('Unsupported gpxType.'));
                    }
                }
            });
        });
    });
};
