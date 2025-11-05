import { Pipe, PipeTransform } from '@angular/core';
import { Department } from './model/employee';
const MapDepartments: Record<Department, string> = {
  'IT': 'Information Technology',
  'Marketing': 'Marketing',
  'HR': 'Human Resources'
}
@Pipe({
  name: 'department',
  standalone: true
})
export class DepartmentPipe implements PipeTransform {

  transform(value: Department): string {
    return MapDepartments[value] || 'Unknown Department';
  }

}
