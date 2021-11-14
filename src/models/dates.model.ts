'use strict';
import dbConn from './../config/db.config';

import {DateInterface} from './types';

//Employee object create
const ParsedDate = (date: DateInterface) => ({
    date: date.date,
    commissions: date.commissionsTotal,
    sales: date.salesNet,
    leads: date.leadsNet,
    clicks: date.clicks,
    epc: date.epc,
    impressions: date.impressions,
    created_at: new Date(),
    updated_at: new Date()
});


ParsedDate.create = (newEmp, result) => {
    dbConn.query("INSERT INTO dates set ?", newEmp, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};


ParsedDate.findAll = (result) => {
    dbConn.query("Select * from dates", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('employees : ', res);
            result(null, res);
        }
    });
};

ParsedDate.deleteAll = (result) => {
    dbConn.query("DELETE FROM dates", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('employees : ', res);
            result(null, res);
        }
    });
};

export default ParsedDate;