import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LeaveRequest } from '../../../../core/models/leave-request';
import { LeaveRequestService } from '../../../../core/services/leaveRequest/leave-request.service';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DetailsHrLeaveRequestComponent } from './details-hr-leave-request/details-hr-leave-request.component';

@Component({
  selector: 'app-hr-leave-request-list',
  templateUrl: './hr-leave-request-list.component.html',
  styleUrl: './hr-leave-request-list.component.scss'
})
export class HrLeaveRequestListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator

  leaveRequestList = new MatTableDataSource<LeaveRequest>()

  displayedColumns: string[] = ['ID', 'Employee_ID', 'Absence_Reason', 'Start_Date', 'End_Date', 'Status', 'Details'];


  constructor(
    private leaveRequest: LeaveRequestService,
    private dialogRef: MatDialog
  ) {}

  ngOnInit(): void {
    this.getLeaveRequests()
  }

  ngAfterViewInit(): void {
    this.leaveRequestList.paginator = this.paginator
  }

  showLeaveRequestDetails(request: LeaveRequest): void {
    const dialogRef = this.dialogRef.open(DetailsHrLeaveRequestComponent, {
      data: request
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        const leaveRequestIndex = this.leaveRequestList.data.findIndex((leaveRequest: LeaveRequest) => leaveRequest.ID === result.requestId)
        this.leaveRequestList.data[leaveRequestIndex].Status = result.updatedStatus
        this.leaveRequestList._updateChangeSubscription()
      }
    })
  }

  filterLeaveRequests(inputValue: Event): void {
    let searchTerm = (inputValue.target as HTMLInputElement).value
    this.leaveRequestList.filter = searchTerm
  }

  getLeaveRequests(): void {
    this.leaveRequest.getLeaveRequests().pipe(
      take(1)).subscribe((leaveRequestListData: LeaveRequest[]) => {
      this.leaveRequestList.data = leaveRequestListData
    })
  }
}
