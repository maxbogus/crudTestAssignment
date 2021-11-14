type callback = (argOne, res) => {};

export interface EmployeeInterface {
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface DateInterface {
    date: string;
    commissionsTotal: string;
    salesNet: string;
    leadsNet: string;
    clicks: string;
    epc: string;
    impressions: string;
    cr: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface EmployeeObject extends EmployeeInterface {
    create(newEmp, result: callback): void;
    findById(id, result: callback): void;
    findAll(result: callback): void;
    update(id, employee, result: callback): void;
    delete(id, result: callback): void
}

export interface DateObject extends DateInterface {
    create(newEmp, result: callback): void;
    findById(id, result: callback): void;
    findAll(result: callback): void;
    update(id, employee, result: callback): void;
    delete(id, result: callback): void
}