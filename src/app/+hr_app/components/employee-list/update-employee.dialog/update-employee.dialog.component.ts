import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../../core/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../../core/services/employee/employee.service';

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
  subdivisions: string[] = []
  positions: string[] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public userData: User,
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    console.log(this.userData)
    this.selectedUser = this.userData
    this.editUserForm = this.fb.group({
      id: [this.userData.ID, [Validators.required]],
      fullname: [this.userData.Full_Name, [Validators.required]],
      subdivision: [this.userData.Subdivision, [Validators.required]],
      position: [this.userData.Position, [Validators.required]],
      status: [this.userData.Status, [Validators.required]],
      partner: [this.userData.People_Partner, [Validators.required]],
      oof: [this.userData.Out_of_Office_Balance, [Validators.required]]
    })

    this.subdivisions = this.employeeService.subdivisions

    this.editUserForm.get('subdivision')!.valueChanges.subscribe((subdivision: string) => {
      this.editUserForm.get('position')!.patchValue(null);
      if (subdivision === 'IT') this.positions = this.employeeService.employeePositions.IT
      if (subdivision === 'HR') this.positions = this.employeeService.employeePositions.HR
      if (subdivision === 'Sales') this.positions = this.employeeService.employeePositions.Sales
      if (subdivision === 'Marketing') this.positions = this.employeeService.employeePositions.Marketing
    })
  }

}
