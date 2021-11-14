export enum EmployeeStatus {
    Terminated = "Terminated",
    Active = "Active"
}

type callback = (argOne, res) => {};

export interface EmployeeInterface {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    organization: string;
    designation: string;
    salary: number;
    status: EmployeeStatus;
    create(newEmp, result: callback): void;
    findById(id, result: callback): void;
    findAll(result: callback): void;
    update(id, employee, result: callback): void;
    delete(id, result: callback): void
}