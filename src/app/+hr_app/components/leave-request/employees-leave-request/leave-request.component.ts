import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Employee } from '../../../../core/models/employee';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { LeaveRequestStatus } from '../../../../core/enums/leave-request-status';
import { LeaveRequestService } from '../../../../core/services/leaveRequest/leave-request.service';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './leave-request.component.scss'
})
export class LeaveRequestComponent implements OnInit {

  submissionText = ''
  currentEmployee!: Employee
  leaveRequestForm!: FormGroup

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private leaveRequestService: LeaveRequestService
    ) {}

  ngOnInit(): void {
    this.currentEmployee = this.authService.currentUser.value!
    this.leaveRequestForm = this.fb.group({
      Employee_ID: [this.currentEmployee.ID, [Validators.required]],
      Absence_Reason: ['', [Validators.required]],
      Start_Date: [Date, [Validators.required]],
      End_Date: [Date, [Validators.required]],
      Comment: ['', [Validators.required]],
      Status: [LeaveRequestStatus.Submitted, [Validators.required]]
    })
  }
  submitLeaveRequestForm(): void {
    const leaveRequest = {
      Employee_ID: this.leaveRequestForm.get('Employee_ID')?.value,
      Absence_Reason: this.leaveRequestForm.get('Absence_Reason')?.value,
      Start_Date: new Date(this.leaveRequestForm.get('Start_Date')?.value).toISOString().split('T')[0],
      End_Date: new Date(this.leaveRequestForm.get('End_Date')?.value).toISOString().split('T')[0],
      Comment: this.leaveRequestForm.get('Comment')?.value,
      Status: this.leaveRequestForm.get('Status')?.value
    }
    this.leaveRequestService.addLeaveRequest(leaveRequest).subscribe(() => {
      this.submissionText = 'You have successfuly added a leave request'
      this.leaveRequestForm.reset()
    })
  }
}
