import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../../core/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../../core/services/employee/employee.service';
import { Subdivision, EmployeePositions } from '../../../../core/enums/subdivisions';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-update-employee.dialog',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './update-employee.dialog.component.html',
  styleUrl: './update-employee.dialog.component.scss'
})
export class UpdateEmployeeDialogComponent implements OnInit {

  selectedUser!: User 
  editUserForm!: FormGroup
  subdivisions: string[] = [] = Object.values(Subdivision)
  positions: string[] = []
  partnersIds: number[] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public userData: User,
    private fb: FormBuilder,
    private authService: AuthService,
    private employeeService: EmployeeService,
    private readonly _dialog: MatDialogRef<UpdateEmployeeDialogComponent>
  ) {}

  ngOnInit(): void {
    this.selectedUser = this.userData
    
    this.editUserForm = this.fb.group({
      Full_Name: [this.userData.Full_Name, [Validators.required]],
      Subdivision: [this.userData.Subdivision, [Validators.required]],
      Position: [this.userData.Position, [Validators.required]],
      Status: [this.userData.Status, [Validators.required]],
      People_Partner: [this.userData.People_Partner, [Validators.required]],
      Out_of_Office_Balance: [this.userData.Out_of_Office_Balance, [Validators.required]],
      ID: [this.userData.ID]
    })

    this.authService.getEmployeeBySubdivision('HR').subscribe((hrManagers: User[]) => {
      hrManagers.forEach((hrManager: User) => this.partnersIds?.push(hrManager.ID))
    })

    this.editUserForm.get('Subdivision')!.valueChanges.subscribe((subdivision: Subdivision) => {
      this.editUserForm.get('Position')!.patchValue(null)
      this.positions = EmployeePositions[subdivision] || []
    })
  }

  submitChanges(): void {
    const updatedUser = this.editUserForm.value
    this.employeeService.updateEmployee(updatedUser).subscribe()
    this._dialog.close(updatedUser)
  }

}
