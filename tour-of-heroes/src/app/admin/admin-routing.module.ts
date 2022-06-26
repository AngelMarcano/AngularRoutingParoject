import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

import { AdminComponent } from './admin/admin.component';
import { ManageCrisisComponent } from './manage-crisis/manage-crisis.component';
import { ManageHeroesComponent } from './manage-heroes/manage-heroes.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        // canActivateChild: [AuthGuard],
        children: [
          { path: 'crises', component: ManageCrisisComponent },
          { path: 'heroes', component: ManageHeroesComponent },
          // { path: '', component: AdminDashboardComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
