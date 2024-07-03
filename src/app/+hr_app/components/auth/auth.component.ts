import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Employee } from '../../../core/models/employee';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { Subdivision } from '../../../core/enums/subdivisions'

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  subdivisionArray = Object.values(Subdivision)
  employeesData: Employee[] = []
  chosenEmployeeName?: string | null = ''

  subdivision = ''
  idBySubdivision: number[] = []

  authForm!: FormGroup

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(){
    this.authService.currentUser.next(null)
    localStorage.removeItem('user_data')
    this.initForm()
    this.getAllEmployees()
    this.enableSelectId()
    this.enableFullName()
  }

  initForm(): void {
    this.authForm = this.fb.group({
      subdivision: ['', [Validators.required]],
      id: [{value: '', disabled: true}, [Validators.required]]
    })
  }

  getAllEmployees(): void {
    this.employeeService.getAllEmployees()
    .pipe(take(1))
    .subscribe((data: Employee[]) => {
      this.employeesData = data
      return data
    })
  }

  enableSelectId(): void {
    this.authForm.get('subdivision')?.valueChanges.subscribe((subdivisionData: string) => {
        this.chosenEmployeeName = null
        this.authForm.get('id')?.enable()
        this.authForm.get('id')?.patchValue(null)
        this.employeeService.getEmployeesBySubdivision(subdivisionData).subscribe((data: Employee[]) => {
          this.idBySubdivision = data.map((user: Employee) => user.ID)
          this.chosenEmployeeName = ''
        })
    })
  }

  enableFullName(): void {
    this.authForm.get('id')?.valueChanges.subscribe((id: number) => {
      if (id !== null) {
        this.employeeService.getAllEmployees()
          .pipe(take(1))
          .subscribe((data: Employee[]) => {
            const employee = data.find((user: Employee) => user.ID === id)
            if (employee) this.chosenEmployeeName = employee.Full_Name;
          })
      } else this.chosenEmployeeName = null
    })
  }

  submitForm(): void {
    this.employeeService.getEmployeeById(this.authForm.get('id')?.value).subscribe((user: Employee) => {
      this.authService.currentUser.next(user)
      localStorage.setItem('user_data', JSON.stringify(user))
      if (user.Subdivision === Subdivision.HR) {
        this.router.navigate(['/employee-list'])
      } else this.router.navigate(['/projects'])
    })
  }
}