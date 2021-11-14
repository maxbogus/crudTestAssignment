'use strict';
import dbConn from './../config/db.config';

import {EmployeeInterface} from './types';

//Employee object create
const Employee = (employee: EmployeeInterface) => ({
    first_name: employee.first_name,
    last_name: employee.last_name,
    email: employee.email,
    avatar: employee.avatar,
    created_at: new Date(),
    updated_at: new Date()
});

Employee.create = (newEmp, result) => {
    dbConn.query("INSERT INTO employees set ?", newEmp, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

Employee.findById = (id, result) => {
    dbConn.query("Select * from employees where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Employee.findAll = (result) => {
    dbConn.query("Select * from employees", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('employees : ', res);
            result(null, res);
        }
    });
};

Employee.update = (id, employee, result) => {
    dbConn.query("UPDATE employees SET first_name=?,last_name=?,email=?,avatar=? WHERE id = ?", [employee.first_name, employee.last_name, employee.email, employee.avatar, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Employee.delete = (id, result) => {
    dbConn.query("DELETE FROM employees WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

export default Employee;