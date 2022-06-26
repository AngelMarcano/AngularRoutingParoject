import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HeroesListComponent } from './heroes/heroes-list/heroes-list.component';
import { HeroDetailComponent } from './heroes/hero-detail/hero-detail.component';
import { HeroesService } from './heroes/heroes.service';
import { Router } from '@angular/router';
import { CrisisListComponent } from './crisis-center/crisis-list/crisis-list.component';
import { CrisisDetailComponent } from './crisis-center/crisis-detail/crisis-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LogingComponent } from './auth/loging/loging.component';
import { AdminComponent } from './admin/admin/admin.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';




@NgModule({
  declarations: [
    AppComponent,
    HeroesListComponent,
    HeroDetailComponent,
    CrisisListComponent,
    CrisisDetailComponent,
    PageNotFoundComponent,
    LogingComponent,
    AdminComponent,
    AdminDashboardComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [HeroesService, SelectivePreloadingStrategyService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    // Use a custom replacer to display function names in the route configs
    // const replacer = (key, value) => (typeof value === 'function') ? value.name : value;

    // console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}
