import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { take } from 'rxjs';
import { Employee } from '../../../core/models/employee';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeUpdateeDialogComponent } from './employee-update.dialog/employee-update.dialog.component';
import { EmployeeChangeStatusDialogComponent } from './employee-change-status.dialog/employee-change-status.dialog.component';
import { EmployeeAddDialogComponent } from './employee-add.dialog/employee-add.dialog.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'full_name', 'subdivision', 'position', 'status', 'people_partner', 'out_of_office_balance', 'update', 'deactivate'];
  dataSource = new MatTableDataSource<Employee>()

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.employeeService.getAllEmployees().pipe(take(1)).subscribe((data: Employee[]) => this.dataSource.data = data)
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }

  filterEmployees(input: Event): void {
    let inputValue = (input.target as HTMLInputElement).value
    this.dataSource.filter = inputValue
  }

  updateEmployee(user: Employee): void {
    const dialogRef = this.dialog.open(EmployeeUpdateeDialogComponent, {
      data: user
    })

    dialogRef.afterClosed().subscribe((result: Employee) => {
      if (result) {
        const userIndex = this.dataSource.data.findIndex((employee: Employee) => employee.ID === result.ID)
        this.dataSource.data[userIndex] = result
        this.dataSource._updateChangeSubscription()
      }
    })
  }

  deactivateEmployee(user: Employee): void {
    const dialogRef = this.dialog.open(EmployeeChangeStatusDialogComponent, {
      data: user
    })

    dialogRef.afterClosed().subscribe(() => {
      this.employeeService.getAllEmployees().subscribe((data: Employee[]) => this.dataSource.data = data)
    })
  }

  openAddEmployeeDialog(): void {
    const dialogRef = this.dialog.open(EmployeeAddDialogComponent)

    dialogRef.afterClosed().subscribe(() => {
      this.employeeService.getAllEmployees().subscribe((data: Employee[]) => this.dataSource.data = data)
    })
  }

}
