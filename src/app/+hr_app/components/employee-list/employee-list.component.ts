import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { take } from 'rxjs';
import { User } from '../../../core/models/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { UpdateEmployeeDialogComponent } from './update-employee.dialog/update-employee.dialog.component';
import { DialogRef } from '@angular/cdk/dialog';
import { DeadcivateEmployeeDialogComponent } from './deadcivate-employee.dialog/deadcivate-employee.dialog.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'full_name', 'subdivision', 'position', 'status', 'people_partner', 'out_of_office_balance', 'update', 'deactivate'];
  dataSource = new MatTableDataSource<User>()

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.employeeService.getAllEmployees().pipe(take(1)).subscribe((data: User[]) => {
      this.dataSource.data = data
      console.log(data)
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }

  filterEmployees(input: Event): void {
    let inputValue = (input.target as HTMLInputElement).value
    this.dataSource.filter = inputValue
  }

  updateEmployee(user: User): void {
    const dialogRef = this.dialog.open(UpdateEmployeeDialogComponent, {
      data: user
    })

    dialogRef.afterClosed().subscribe((result: User) => {
      if (result) {
        const userIndex = this.dataSource.data.findIndex((user: User) => user.ID === result.ID)
        this.dataSource.data[userIndex] = result
        this.dataSource._updateChangeSubscription()
      }
    })
  }

  deactivateEmployee(user: User): void {
    const dialogRef = this.dialog.open(DeadcivateEmployeeDialogComponent, {
      data: user
    })

    dialogRef.afterClosed().subscribe((result: User) => {
      this.employeeService.getAllEmployees().subscribe((data: User[]) => this.dataSource.data = data)
    })
  }

}
