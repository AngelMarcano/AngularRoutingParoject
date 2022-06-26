import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { IHeroes } from '../heroes';
import { HeroesService } from '../heroes.service';



@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css']
})
export class HeroesListComponent implements OnInit {
  public heroesList : Observable<IHeroes[]> | undefined;
  selectedId = 0;
  hero : Observable<IHeroes> | undefined 
  
  
  constructor(private _heroServices: HeroesService, private route: ActivatedRoute) { 

    
  }



  ngOnInit(): void {
    this.heroesList = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = parseInt(params.get('id')!, 10);
        return this._heroServices.getHeroes();
      })
    );
  }

}
