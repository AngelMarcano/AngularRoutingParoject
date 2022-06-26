import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ConnectableObservable, map, Observable } from 'rxjs';
import { SelectivePreloadingStrategyService } from 'src/app/selective-preloading-strategy.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  values!: Observable<string>;
  token!: Observable<string>;
  temp!: Observable<string>;
  modules: string[] = [];

  temp1 : string | undefined;
  session : string |undefined;

  constructor(private route: ActivatedRoute, preloadStrategy: SelectivePreloadingStrategyService) { 
   

    this.route.paramMap.subscribe(data => console.log(data));
    this.modules = preloadStrategy.preloadedModules;
  
  }

  ngOnInit(): void {
      // Capture the session ID if available
      //this.values = this.route.queryParamMap.pipe(map(params => params.get('session_id') || 'None'));
      //this.temp =  this.route.queryParamMap.pipe(map(params => params.get('temp') || 'None'));

      this.route.queryParamMap.pipe(map(params => params.get('session_id') || 'None')).subscribe(data => {
        this.session = data
      });

      this.route.queryParamMap.pipe(map(params => params.get('temp') || 'None')).subscribe(data => {
        this.temp1 = data
      });
      console.log("SessionId: " + JSON.stringify(this.session));
      console.log("Temp1: " + JSON.stringify(this.temp1));
      
      
      // Capture the fragment if available
      this.token = this.route
      .fragment
      .pipe(map(fragment => fragment || 'None'));

      console.log("token: " + JSON.stringify(this.token));
      }

      
    }
