import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subdivision } from '../../../../core/enums/subdivisions';
import { EmployeePositions } from '../../../../core/enums/subdivisions';
import { EmployeeService } from '../../../../core/services/employee/employee.service';
import { Employee } from '../../../../core/models/employee';
import { map, take } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-add.dialog',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './employee-add.dialog.component.html',
  styleUrl: './employee-add.dialog.component.scss'
})
export class EmployeeAddDialogComponent implements OnInit {

  subdivisions = Object.values(Subdivision)
  employeePositions: string[] = []
  partners: number[] = []
  addEmployeeForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private readonly _dialog: MatDialogRef<EmployeeAddDialogComponent>
  ) {}

  ngOnInit(): void {
    this.addEmployeeForm = this.fb.group({
      Full_Name: ['', [Validators.required]],
      Subdivision: ['', [Validators.required]],
      Position: ['', [Validators.required]],
      Status: ['Active', [Validators.required]],
      People_Partner: [null, [Validators.required]],
      Out_of_Office_Balance: [20, [Validators.required]]
    })
    this.enablePosition()
    this.fetchPartners()

  }

  enablePosition(): void {
    this.addEmployeeForm.get('Subdivision')?.valueChanges.subscribe((subdivision: Subdivision) => this.employeePositions = EmployeePositions[subdivision])
  }

  fetchPartners(): void {
    this.employeeService.getEmployeesBySubdivision('HR').pipe(take(1), map((hrEmployees: Employee[]) => {
      let hrEmployeesIds: number[] = []
      hrEmployees.forEach((employee: Employee) => hrEmployeesIds.push(employee.ID))
      return hrEmployeesIds
    })).subscribe((data: number[]) => this.partners = data)
  }

  submitAddEmployeeForm(): void {
    this.employeeService.addEmployee(this.addEmployeeForm.value).subscribe()
    this._dialog.close()
  }
}
