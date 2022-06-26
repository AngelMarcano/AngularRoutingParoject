import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IHeroes } from './heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  //private _jsonURL = '/assets/heroes.json';
  private _jsonURL = 'http://localhost:3000/heroes';
  
  datos :IHeroes = {
    id: 0,
    name: ''
  }

  constructor(private http: HttpClient) { }

  getHeroes() : Observable<IHeroes[]>{
    return this.http.get<IHeroes[]>(this._jsonURL);
  }

  getHero(id:string) : Observable<IHeroes| undefined>{

    
    return this.getHeroes().pipe(map((heroes: IHeroes[]) => heroes.find(x => x.id == parseInt(id))));
    

    
  }
}
