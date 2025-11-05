import { Component } from '@angular/core';
type Department = "IT" | "Marketing" | 'HRR'
type Level = 'J' | 'M' | 'S'
interface Employee {

  _id: string;
  name: string;
  department: Department
  level: Level;

}
@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {
  employee = {
    "_id": "675173e704ea0d53bbcdb314",
    "name": "User Tooto",
    "department": "IT",
    "level": "J"
  }
}
