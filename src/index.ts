import {fetchData} from './api';
import {parseData} from "./parser";
import Employee from './models/users.model';
import {DateObject, EmployeeObject} from './models/types';
import ParsedDate from "./models/dates.model";

// fetch data and store it in DB
fetchData().then(result => {
    console.log('Start fetching data');
    // write down employees
    result.forEach(user => {
        const employee: EmployeeObject = Employee({first_name: user.first_name, avatar: user.avatar, last_name: user.last_name, email: user.email}) as EmployeeObject;
        Employee.create(employee, (data) => console.log(data))
    });

    // show all employees
    Employee.findAll((test) => console.log(test));

    // clear table
    Employee.deleteAll((test) => console.log(test));
    console.log('Stop fetching data');
});

// init puppeteer
parseData().then( result => {
    console.log('Start fetching data');
    result.forEach(result => {
        const date: DateObject = ParsedDate({
            date: result.date,
            commissionsTotal: result.commissionsTotal,
            salesNet: result.salesNet,
            leadsNet: result.leadsNet,
            clicks: result.clicks,
            epc: result.epc,
            impressions: result.impressions,
            cr: result.cr
        }) as unknown as DateObject;
        ParsedDate.create(date, (data) => console.log(data));
    })

    ParsedDate.findAll((test) => console.log(test));
    // clear table
    ParsedDate.deleteAll((test) => console.log(test));
    console.log('Stop fetching data');
});
