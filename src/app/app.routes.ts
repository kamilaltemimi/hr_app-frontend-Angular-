import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', 
        loadChildren: () => import('./+hr_app/hr-app.module').then(m => m.HrAppModule)
    }
];
