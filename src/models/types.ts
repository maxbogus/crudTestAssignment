type callback = (argOne, res) => {};

export interface EmployeeInterface {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
    create(newEmp, result: callback): void;
    findById(id, result: callback): void;
    findAll(result: callback): void;
    update(id, employee, result: callback): void;
    delete(id, result: callback): void
}