import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ManageHeroesComponent } from './manage-heroes/manage-heroes.component';
import { ManageCrisisComponent } from './manage-crisis/manage-crisis.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ManageCrisisComponent,
    ManageHeroesComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
