import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestComponent } from './test/test.component';
import { EmployeeComponent } from './employee/employee.component';
import { Employee } from './model/employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EmployeeComponent],
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

  template: `<app-employee [employee]="employee" (nameClick)="onNameClick($event)"/> `,
  // styleUrl: './app.component.scss'
})
export class AppComponent {
  employee: Employee = {
    "_id": "675173e704ea0d53bbcdb314",
    "name": "User Tooto",
    "department": "IT",
    "level": "M"
  }
  title = 'Title of component';
  age = 30;
  counter = 0;
  theInputtext = '';
  msgClass = "success"
  valueTypeInput = 'password'
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
