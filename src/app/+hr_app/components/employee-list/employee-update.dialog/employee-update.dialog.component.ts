import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../../../../core/models/employee';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../../core/services/employee/employee.service';
import { Subdivision, EmployeePositions } from '../../../../core/enums/subdivisions';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-update-employee.dialog',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './employee-update.dialog.component.html',
  styleUrl: './employee-update.dialog.component.scss'
})
export class EmployeeUpdateeDialogComponent implements OnInit {

  selectedEmployee!: Employee 
  editEmployeeForm!: FormGroup
  subdivisions: string[] = Object.values(Subdivision)
  positions: string[] = []
  partnersIds: number[] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public userData: Employee,
    private fb: FormBuilder,
    private authService: AuthService,
    private employeeService: EmployeeService,
    private readonly _dialog: MatDialogRef<EmployeeUpdateeDialogComponent>
  ) {}

  ngOnInit(): void {
    this.selectedEmployee = this.userData
    
    this.editEmployeeForm = this.fb.group({
      Full_Name: [this.userData.Full_Name, [Validators.required]],
      Subdivision: [this.userData.Subdivision, [Validators.required]],
      Position: [this.userData.Position, [Validators.required]],
      Status: [this.userData.Status, [Validators.required]],
      People_Partner: [this.userData.People_Partner, [Validators.required]],
      Out_of_Office_Balance: [this.userData.Out_of_Office_Balance, [Validators.required]],
      ID: [this.userData.ID]
    })

    this.authService.getEmployeesBySubdivision('HR').pipe(take(1)).subscribe((hrManagers: Employee[]) => {
      hrManagers.forEach((hrManager: Employee) => this.partnersIds?.push(hrManager.ID))
    })

    this.editEmployeeForm.get('Subdivision')!.valueChanges.subscribe((subdivision: Subdivision) => {
      this.editEmployeeForm.get('Position')!.patchValue(null)
      this.positions = EmployeePositions[subdivision] || []
    })
  }

  submitChanges(): void {
    const updatedUser = this.editEmployeeForm.value
    this.employeeService.updateEmployee(updatedUser).pipe(take(1)).subscribe()
    this._dialog.close(updatedUser)
  }

}
