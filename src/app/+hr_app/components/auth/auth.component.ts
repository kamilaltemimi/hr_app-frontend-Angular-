import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/services/auth/auth.service';
import { User } from '../../../core/models/user';
import { take } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, FlexLayoutModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  subdivisionArray = ['HR', 'IT', 'Marketing', 'Sales']
  employeesData: User[] = []
  chosenEmployeeName?: string = ''

  subdivision = ''
  idBySubdivision: number[] = []

  authForm!: FormGroup

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
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
    .subscribe((data: User[]) => {
      this.employeesData = data
      return data
    })
  }

  enableSelectId(): void {
    this.authForm.get('subdivision')?.valueChanges.subscribe((subdivisionData: string) => {
      this.subdivision = subdivisionData
      if (subdivisionData) {
        this.authForm.get('id')?.enable()
        this.authService.getEmployeeBySubdivision(subdivisionData).subscribe((data: User[]) => {
          this.idBySubdivision = data.map((user: User) => user.ID)
          this.chosenEmployeeName = ''
        })
      } 
    })
  }

  enableSelectFullName(): void {
    this.authForm.get('id')?.valueChanges.subscribe((id: number) => {
      this.authService.getAllEmployees()
      .pipe(take(1))
      .subscribe((data: User[]) => {
        const employee = data.find((user: User) => user.ID === id)
        this.chosenEmployeeName = employee?.Full_Name
      })
    })
  }

  submitForm(): void {
    this.authService.getEmployeeById(this.authForm.get('id')?.value).subscribe((user: User) => {
      this.authService.currentUser.next(user)
      localStorage.setItem('user_data', JSON.stringify(user))
    })
  }

}
