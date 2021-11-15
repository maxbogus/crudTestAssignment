import {fetchData} from './api';
import ParsedDate from './models/dates.model';
import {DateObject, EmployeeObject} from './models/types';
import Employee from './models/users.model';
import {parseData} from './parser';

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
    let parsedResult = [];
    result.map(item => parsedResult.push(item.split('\t')));

    parsedResult.forEach(item => {
        const date: DateObject = ParsedDate({
            date: item[0],
            commissionsTotal: item[1],
            salesNet: item[2],
            leadsNet: item[3],
            clicks: item[4],
            epc: item[5],
            impressions: item[6],
            cr: item[7]
        }) as unknown as DateObject;
        ParsedDate.create(date, (data) => console.log(data));
    })

    ParsedDate.findAll((test) => console.log(test));
    // clear table
    ParsedDate.deleteAll((test) => console.log(test));
    console.log('Stop fetching data');
});
