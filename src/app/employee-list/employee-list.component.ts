import { Component, input } from '@angular/core';
import { Employee } from '../model/employee';
import { DepartmentPipe } from '../department.pipe';
import { LevelPipe } from '../level.pipe';
import { EmployeeComponent } from '../employee/employee.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [LevelPipe, DepartmentPipe, EmployeeComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent {
  employees = input.required<Employee[]>();
  showCard = true;

  toggleCardVisibility() {
    this.showCard = !this.showCard;
  }
  editEmployee(empId: string) {
    console.log("Edit employee with ID:", empId);
  }
  employee!: Employee;

  viewEmployee(empId: string) {
    this.employee = this.employees().find((e: Employee) => e._id === empId)!;
    this.toggleCardVisibility();

  }
  deleteEmployee(empId: string) {
    console.log("Delete employee with ID:", empId);
  }
}
