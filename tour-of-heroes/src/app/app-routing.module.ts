import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin/admin/admin.component';
import { ManageCrisisComponent } from './admin/manage-crisis/manage-crisis.component';
import { ManageHeroesComponent } from './admin/manage-heroes/manage-heroes.component';
import { AuthGuard } from './auth/auth.guard';
import { LogingComponent } from './auth/loging/loging.component';
import { CrisisDetailComponent } from './crisis-center/crisis-detail/crisis-detail.component';
import { CrisisListComponent } from './crisis-center/crisis-list/crisis-list.component';
import { HeroDetailComponent } from './heroes/hero-detail/hero-detail.component';
import { HeroesListComponent } from './heroes/heroes-list/heroes-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';

const routes: Routes = [
  { path: 'heroes', redirectTo: '/superheroes-list' },
  { path: 'hero/:id', redirectTo: '/superhero/:id' },
  { path: 'superheroes-list',  component: HeroesListComponent, data: { animation: 'heroes' } },
  { path: 'superhero/:id', component: HeroDetailComponent, data: { animation: 'hero' } },
  { path: 'login',  component: LogingComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          // { path: 'crises', component: ManageCrisisComponent },
          // { path: 'heroes', component: ManageHeroesComponent, data: { preload: true } },
          { path: 'adminDash', component: AdminDashboardComponent },
          { path: '',   redirectTo: 'adminDash', pathMatch: 'full' },
        ]
      }
    ]
   },
  { path: '',   redirectTo: '/superheroes-list', pathMatch: 'full' },


  { path: 'crisisList',
    component: CrisisListComponent,
    children: [
      {
        path: ':id',
        component: CrisisDetailComponent,

      },
     ]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    //canLoad: [AuthGuard], //El módulo se carga cuando se activa el link (lazy loading)
    data: { preload: true } //En éste caso el módulo es precargado al iniciar la app (eager loading)
  },
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      enableTracing: false, // <-- debugging purposes only
      preloadingStrategy: SelectivePreloadingStrategyService
    }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
