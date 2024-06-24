import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HrAppComponent } from './hr-app.component';
import { HrAppRouterModule } from './hr-app-router.module';



@NgModule({
  declarations: [
    HrAppComponent,
  ],
  imports: [
    CommonModule,
    HrAppRouterModule
  ]
})
export class HrAppModule { }
