import express from 'express';
import bodyParser from 'body-parser';

import {User} from './types';
import {fetchData} from './utils';
import Employee from "./models/users.model";
import {EmployeeObject} from "./models/types";

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

fetchData().then(result => {
    result.forEach(user => {
        const employee: EmployeeObject = Employee({first_name: user.first_name, avatar: user.avatar, last_name: user.last_name, email: user.email}) as EmployeeObject;
        Employee.create(employee, (data) => console.log(data))
    })
    Employee.findAll((data) => console.log(data))
});

// listen for requests
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});