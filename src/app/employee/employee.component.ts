import { Component, input, output } from '@angular/core';
import { LevelPipe } from '../level.pipe';
import { Employee } from '../model/employee';
import { DepartmentPipe } from '../department.pipe';


@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [LevelPipe, DepartmentPipe],
  templateUrl: './employee.component.html',
  // template: `
  //   <div class="employee-card">
  //     <h2>{{ employee.name }}</h2>
  //     <p><strong>Department:</strong> {{ employee.department }}</p>
  //     <p><strong>Level:</strong> {{ "S"| level }}</p>
  //   </div>

  // `,
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {
  employee = input.required<Employee>();
  nameClick = output<string>();
  handleNameClick() {
    this.nameClick.emit(this.employee()._id)
  }

}
