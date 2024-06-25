import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HrAppComponent } from "./hr-app.component";
import { AuthComponent } from "./components/auth/auth.component";
import { EmployeeListComponent } from "./components/employee-list/employee-list.component";
import { ProjectsComponent } from "./components/projects/projects.component";
import { LeaveRequestComponent } from "./components/leave-request/leave-request.component";
import { ApprovalRequestComponent } from "./components/approval-request/approval-request.component";

const routes: Routes = [
    { path: '', redirectTo: 'auth', pathMatch: "full" },
    { path: 'auth', component: AuthComponent },
    { path: 'employee-list', component: EmployeeListComponent },
    { path: 'projects', component: ProjectsComponent },
    { path: 'leave-request', component: LeaveRequestComponent },
    { path: 'approval-request', component: ApprovalRequestComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HrAppRouterModule{}