import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HrAppComponent } from './hr-app.component';
import { HrAppRouterModule } from './hr-app-router.module';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    HrAppComponent,
    EmployeeListComponent
  ],
  imports: [
    CommonModule,
    HrAppRouterModule,
    SharedModule
  ]
})
export class HrAppModule { }
