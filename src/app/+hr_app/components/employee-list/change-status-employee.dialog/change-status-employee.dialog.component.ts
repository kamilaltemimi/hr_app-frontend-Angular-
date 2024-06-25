import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../../core/models/user';
import { SharedModule } from '../../../../shared/shared.module';
import { EmployeeService } from '../../../../core/services/employee/employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deadcivate-employee.dialog',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './change-status-employee.dialog.component.html',
  styleUrl: './change-status-employee.dialog.component.scss'
})
export class ChangeStatusEmployeeDialogComponent implements OnInit {

  selectedUser!: User

  constructor(
    @Inject (MAT_DIALOG_DATA) public userData: User,
    private readonly _dialog: MatDialogRef<ChangeStatusEmployeeDialogComponent>,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    console.log(this.userData)
    this.selectedUser = this.userData
  }

  deactivateEmployee(): void {
    this.employeeService.deactivateEmployee(this.selectedUser).subscribe()
      this._dialog.close()
    }

  activateEmployee(): void {
    this.employeeService.activateEmployee(this.selectedUser).subscribe()
    this._dialog.close()
  }
}



