import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Crisis } from './crisis';

@Injectable({
  providedIn: 'root'
})
export class CrisisService {

  //private _jsonURL = '/assets/crisis.json';
  private _jsonURL = 'http://localhost:3000/crisis';


  crisis : Crisis = {
    id: 0,
    name: ''
  }
  constructor(private http: HttpClient) {

   }

   getCrisis() : Observable<Crisis[]>{
    return this.http.get<Crisis[]>(this._jsonURL);
  }

  getCrisisById(id:string) : Observable<Crisis| undefined>{

    return this.getCrisis().pipe(map((heroes: Crisis[]) => heroes.find(x => x.id == parseInt(id))));

  }

  updateCrisis(item:Crisis) : Observable<Crisis>{

    let dato : Crisis;

      var newJsonUrl = this._jsonURL + "/" + item.id;
      return this.http.put(newJsonUrl, item) as Observable<Crisis>

  }
  addCrisisManage(newCrsisis : Crisis): Observable<Crisis>{
    return this.http.post(this._jsonURL, newCrsisis) as Observable<Crisis>;
  }
}
