import { Component, Inject, OnInit } from '@angular/core';
import { LeaveRequest } from '../../../../../core/models/leave-request';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../../../core/services/auth/auth.service';
import { Employee } from '../../../../../core/models/employee';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../../shared/shared.module';
import { LeaveRequestStatus } from '../../../../../core/enums/leave-request-status'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveRequestService } from '../../../../../core/services/leaveRequest/leave-request.service';

@Component({
  selector: 'app-details-hr-leave-request',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './details-hr-leave-request.component.html',
  styleUrl: './details-hr-leave-request.component.scss'
})
export class DetailsHrLeaveRequestComponent implements OnInit {

  employee!: Employee
  leaveRequestData!: LeaveRequest
  status = Object.values(LeaveRequestStatus)
  leaveRequestForm!: FormGroup

  constructor(
    @Inject (MAT_DIALOG_DATA) public data: LeaveRequest,
    private authService: AuthService,
    private fb: FormBuilder,
    private leaveRequestService: LeaveRequestService,
    private _dialogRef: MatDialogRef<LeaveRequestStatus>
  ) {}

  ngOnInit(): void {
    this.authService.getEmployeeById(this.data.Employee_ID).subscribe((userData: Employee) => {
      this.employee = userData
    })
    this.leaveRequestData = this.data

    this.leaveRequestForm = this.fb.group({
      Status: [this.data.Status, [Validators.required]]
    })
  }

  submitForm(): void {
    this.leaveRequestService.updateLeaveRequest(this.data.ID!, this.leaveRequestForm.value).subscribe()
    this._dialogRef.close({requestId: this.data.ID, updatedStatus: this.leaveRequestForm.get('Status')!.value})
  }
}