import bodyParser from 'body-parser';
import express from 'express';

import Employee from './models/users.model';
import {EmployeeObject} from './models/types';
import {fetchData} from './utils';

// create express app
const app = express();
// Setup server port
const port = process.env.PORT || 5000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))
// parse requests of content-type - application/json
app.use(bodyParser.json())
// define a root route
app.get('/', (req, res) => {
    res.send("Hello World");
});

// fetch data and store it in DB
fetchData().then(result => {
    // write down employees
    result.forEach(user => {
        const employee: EmployeeObject = Employee({first_name: user.first_name, avatar: user.avatar, last_name: user.last_name, email: user.email}) as EmployeeObject;
        Employee.create(employee, (data) => console.log(data))
    })

    // show all employees
    Employee.findAll();
});
