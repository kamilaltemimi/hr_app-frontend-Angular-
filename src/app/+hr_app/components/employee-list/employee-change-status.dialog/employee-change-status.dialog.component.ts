import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../../../../core/models/employee';
import { SharedModule } from '../../../../shared/shared.module';
import { EmployeeService } from '../../../../core/services/employee/employee.service';
import { CommonModule } from '@angular/common';
import { take } from 'rxjs';

@Component({
  selector: 'app-deadcivate-employee.dialog',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './employee-change-status.dialog.component.html',
  styleUrl: './employee-change-status.dialog.component.scss'
})
export class EmployeeChangeStatusDialogComponent implements OnInit {

  selectedEmployee!: Employee

  constructor(
    @Inject (MAT_DIALOG_DATA) public employeeData: Employee,
    private readonly _dialog: MatDialogRef<EmployeeChangeStatusDialogComponent>,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.selectedEmployee = this.employeeData
  }

  deactivateEmployee(): void {
    this.employeeService.deactivateEmployee(this.selectedEmployee).pipe(take(1)).subscribe()
      this._dialog.close()
    }

  activateEmployee(): void {
    this.employeeService.activateEmployee(this.selectedEmployee).pipe(take(1)).subscribe()
    this._dialog.close()
  }
}