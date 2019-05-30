"use strict";
const WayPoint = require('./WayPoint');

const parseWay = way =>  {

    way = way[0].rtept;

    return way.map(w => {
        var lat = w['$'].lat,
        lng = (w['$'].lng || w['$'].lon);
        return new WayPoint(lat, lng);
    });
};

module.exports = parseWay;
