import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HrAppComponent } from "./hr-app.component";
import { AuthComponent } from "./components/auth/auth.component";

const routes: Routes = [
    { path: '', redirectTo: 'auth', pathMatch: "full" },
    { path: 'auth', component: AuthComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HrAppRouterModule{}