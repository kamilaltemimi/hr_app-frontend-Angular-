import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Employee } from '../../../core/models/employee';
import { take } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, SharedModule, FlexLayoutModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  subdivisionArray = ['HR', 'IT', 'Marketing', 'Sales']
  employeesData: Employee[] = []
  chosenEmployeeName?: string | null = ''

  subdivision = ''
  idBySubdivision: number[] = []

  authForm!: FormGroup

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(){
    this.authService.currentUser.next(null)
    localStorage.removeItem('user_data')
    this.initForm()
    this.getAllEmployees()
    this.enableSelectId()
    this.enableSelectFullName()
  }

  initForm(): void {
    this.authForm = this.fb.group({
      subdivision: ['', [Validators.required]],
      id: [{value: '', disabled: true}, [Validators.required]]
    })
  }

  getAllEmployees(): void {
    this.authService.getAllEmployees()
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
        this.authService.getEmployeesBySubdivision(subdivisionData).subscribe((data: Employee[]) => {
          this.idBySubdivision = data.map((user: Employee) => user.ID)
          this.chosenEmployeeName = ''
        })
    })
  }

  enableSelectFullName(): void {
    this.authForm.get('id')?.valueChanges.subscribe((id: number) => {
      if (id !== null) {
        this.authService.getAllEmployees()
          .pipe(take(1))
          .subscribe((data: Employee[]) => {
            const employee = data.find((user: Employee) => user.ID === id)
            if (employee) this.chosenEmployeeName = employee.Full_Name;
          })
      } else this.chosenEmployeeName = null
    })
  }

  submitForm(): void {
    this.authService.getEmployeeById(this.authForm.get('id')?.value).subscribe((user: Employee) => {
      this.authService.currentUser.next(user)
      localStorage.setItem('user_data', JSON.stringify(user))
      if (user.Position === 'HR Manager') {
        this.router.navigate(['/employee-list'])
      } else this.router.navigate(['/projects'])
    })
  }

}