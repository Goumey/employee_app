import { Injectable } from '@angular/core';
import { Employee } from './model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }
  employees: Employee[] = [{
    "_id": "675173e704ea0d53bbcdb314",
    "name": "User Tooto",
    "department": "IT",
    "level": "M"
  }, {
    "_id": "675173e704ea0d53bbcdb315",
    "name": "User Tutu",
    "department": "Marketing",
    "level": "J"
  }, {
    "_id": "675173e704ea0d53bbcdb316",
    "name": "User Tata",
    "department": "HR",
    "level": "S"
  }];
  getEmployee(id: string) {
    return this.employees.find((e: Employee) => e._id === id)!;

  }
  deletEmployee(id: string) {
    return this.employees.filter((e: Employee) => e._id !== id);
  }
  getEmployees() {
    return this.employees
  }
}
