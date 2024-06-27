import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectStatus } from '../../../../core/enums/status';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../../../../core/models/employee';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ProjectService } from '../../../../core/services/project/project.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-projects-add-dialog',
  standalone: true,
  imports: [CommonModule, SharedModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './projects-add.dialog.component.html',
  styleUrl: './projects-add.dialog.component.scss'
})
export class ProjectsAddDialogComponent implements OnInit {

  addProjectForm!: FormGroup
  
  addedProjectText = ''

  constructor(
    @Inject (MAT_DIALOG_DATA) public userData: Employee,
    private fb: FormBuilder,
    private projectService: ProjectService,
    private _dialog: DialogRef
  ) {}

  ngOnInit(): void {
    this.addProjectForm = this.fb.group({
      Project_Type: ['', [Validators.required]],
      Start_Date: [Date, [Validators.required]],
      End_Date: [Date, [Validators.required]],
      Project_Manager: [this.userData.ID, [Validators.required]],
      Comment: ['', [Validators.required]],
      Status: [ProjectStatus.Active, [Validators.required]]
    })
  }

  submitProjectForm(): void {
    const projectForm = {
      Project_Type: this.addProjectForm.get('Project_Type')?.value,
      Start_Date: new Date(this.addProjectForm.get('Start_Date')?.value).toISOString().split('T')[0],
      End_Date: new Date(this.addProjectForm.get('End_Date')?.value).toISOString().split('T')[0],
      Project_Manager: this.addProjectForm.get('Project_Manager')?.value,
      Comment: this.addProjectForm.get('Comment')?.value,
      Status: this.addProjectForm.get('Status')?.value
    }
    this.projectService.addProject(projectForm).subscribe(() => {
      this.addProjectForm.reset()
      this.addedProjectText = 'You have added the project'
    })

    this._dialog.close()
  }
}
