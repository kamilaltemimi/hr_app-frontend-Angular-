import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MatTableDataSource } from '@angular/material/table';
import { Project } from '../../../core/models/project';
import { MatDialog } from '@angular/material/dialog';
import { ProjectsAddDialogComponent } from './projects-add.dialog/projects-add.dialog.component';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Employee } from '../../../core/models/employee';
import { ProjectService } from '../../../core/services/project/project.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  isAddingProjectAvailable = false
  activeEmployee: Employee | null = null

  dataSource = new MatTableDataSource<Project>()

  displayedColumns: string[] = ['ID', 'Project_Type', 'Start_Date', 'End_Date', 'Project_Manager', 'Comment', 'Status', 'Details'];

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((employeeData: Employee | null) => {
      if (employeeData?.Position.includes('Manager') || employeeData?.Position.includes('Director')) {
        this.isAddingProjectAvailable = true
        this.activeEmployee = employeeData
      }
    })
    this.getAllProjects()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  openAddProjectDialog(): void {
    const dialogRef = this.dialog.open(ProjectsAddDialogComponent, {
      data: this.activeEmployee
    })
    dialogRef.afterClosed().subscribe(() => this.getAllProjects())
  }

  getAllProjects(): void {
    this.projectService.getProjects().subscribe((projects: Project[]) => this.dataSource.data = projects)
  }

  openProjectDetails(): void {
    
  }
}
