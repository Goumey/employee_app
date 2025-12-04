import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestComponent } from './test/test.component';
import { EmployeeComponent } from './employee/employee.component';
import { Employee } from './model/employee';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeService } from './employee.service';
import { PurchaseComponent } from './components/purchase/purchase.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EmployeeComponent, EmployeeListComponent, PurchaseComponent],
  //   template: `
  //   <h1>{{title + " "+ theInputtext}}</h1>

  //   <p>Age : {{age +10}}</p>
  //   <p>Counter : {{counter}}</p>
  //   <button (click)="increment()"> Inc</button>
  // <button (click)="decrement()"> Dec</button>
  // <input #myInput (input)='onEdit(myInput.value)' [type]="valueTypeInput">
  // <button (click)="toggleInput()"> visible</button> 
  // <h5 [class]="msgClass"> Message ...</h5>
  // <button (click)="changeColor('error')">Error</button>
  // <button (click)="changeColor('success')">Success</button>
  //   <button (click)="changeColor('warning')">Warning</button>

  // `,
  styles: ['.success{color:green} .error{color:red} .warning{color:yellow}'],
  // templateUrl: './app.component.html',

  template: `
  <app-purchase/>
  <!-- <app-employee-list  [employees]="employee" />  -->
  `,
  // styleUrl: './app.component.scss'
})
export class AppComponent {
  employee: Employee[] = [];
  title = 'Title of component';
  age = 30;
  counter = 0;
  theInputtext = '';
  msgClass = "success"
  valueTypeInput = 'password'
  employeeService = inject(EmployeeService)
  increment() {
    this.counter++;
  }
  decrement() {
    this.counter == 0 ? this.counter = this.counter :
      this.counter--;
  }
  onEdit(value: string) {
    this.theInputtext = value;
  }
  changeColor(style: "success" | "error" | "warning") {
    this.msgClass = style
  }
  toggleInput() {
    this.valueTypeInput == "password" ? this.valueTypeInput = "text" : this.valueTypeInput = "password";
  }
  onNameClick(employeeId: string) {
    alert(employeeId)
  }
}
