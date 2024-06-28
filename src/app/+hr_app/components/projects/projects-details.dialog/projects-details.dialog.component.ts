import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../../../../core/models/project';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { EmployeeService } from '../../../../core/services/employee/employee.service';
import { map, take } from 'rxjs';
import { Employee } from '../../../../core/models/employee';
import { ProjectStatus } from '../../../../core/enums/status';
import { ProjectService } from '../../../../core/services/project/project.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-projects-details-dialog',
  standalone: true,
  imports: [CommonModule, SharedModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './projects-details.dialog.component.html',
  styleUrl: './projects-details.dialog.component.scss'
})
export class ProjectsDetailsDialogComponent implements OnInit {

  editProjectForm!: FormGroup
  projectDetails!: Project
  editProjectTouched = false

  projectManagersIds: number[] = []
  statusArray = Object.values(ProjectStatus)

  constructor(
    @Inject (MAT_DIALOG_DATA) public projectData: Project,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private projectService: ProjectService,
    public _dialog: DialogRef<ProjectsDetailsDialogComponent>
  ) {}

  ngOnInit(): void {
    this.projectDetails = this.projectData
    this.editProjectForm = this.fb.group({
      ID: [this.projectData.ID, [Validators.required]],
      Project_Type: [this.projectData.Project_Type, [Validators.required]],
      Start_Date: [this.projectData.Start_Date, [Validators.required]],
      End_Date: [this.projectData.End_Date, [Validators.required]],
      Project_Manager: [this.projectData.Project_Manager, [Validators.required]],
      Comment: [this.projectData.Comment, [Validators.required]],
      Status: [this.projectData.Status, [Validators.required]]
    })
    this.employeeService.getAllEmployees().pipe(
      take(1),
      map((employees: Employee[]) => {
        const filteredEmployees: Employee[] = employees.filter((employee: Employee) => employee.Position.includes('Manager') || employee.Position.includes('Director'))
        return filteredEmployees.map((employee: Employee) => employee.ID)
      })
    ).subscribe((data: number[]) => this.projectManagersIds = data)
  }

  allowEditProject(): void {
    this.editProjectTouched = true
  }

  confirmEditProject(): void {
    const updatedProject: Project = {
      ID: this.editProjectForm.get('ID')?.value,
      Project_Type: this.editProjectForm.get('Project_Type')?.value,
      Start_Date: new Date(this.editProjectForm.get('Start_Date')?.value).toISOString().split('T')[0],
      End_Date: new Date(this.editProjectForm.get('End_Date')?.value).toISOString().split('T')[0],
      Project_Manager: this.editProjectForm.get('Project_Manager')?.value,
      Comment: this.editProjectForm.get('Comment')?.value,
      Status: this.editProjectForm.get('Status')?.value

    }
    this.projectService.updateProject(this.editProjectForm.get('ID')?.value, updatedProject).pipe(take(1)).subscribe(() => this._dialog.close())
  }
}