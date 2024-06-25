import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HrAppComponent } from './hr-app.component';
import { HrAppRouterModule } from './hr-app-router.module';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { SharedModule } from '../shared/shared.module';
import { LeaveRequestComponent } from './components/leave-request/leave-request.component';



@NgModule({
  declarations: [
    HrAppComponent,
    EmployeeListComponent,
    LeaveRequestComponent
  ],
  imports: [
    CommonModule,
    HrAppRouterModule,
    SharedModule
  ]
})
export class HrAppModule { }
