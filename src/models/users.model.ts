'use strict';
import dbConn from './../config/db.config';

enum EmployeeStatus {
    Terminated = "Terminated",
    Active = "Active"
}

interface Employee {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    organization: string;
    designation: string;
    salary: number;
    status: EmployeeStatus;
}

//Employee object create
const Employee = (employee: Employee) => ({
    first_name: employee.firstName,
    last_name: employee.lastName,
    email: employee.email,
    phone: employee.phone,
    organization: employee.organization,
    designation: employee.designation,
    salary: employee.salary,
    status: employee.status ? employee.status : EmployeeStatus.Terminated,
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
    dbConn.query("UPDATE employees SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=? WHERE id = ?", [employee.first_name, employee.last_name, employee.email, employee.phone, employee.organization, employee.designation, employee.salary, id], function (err, res) {
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