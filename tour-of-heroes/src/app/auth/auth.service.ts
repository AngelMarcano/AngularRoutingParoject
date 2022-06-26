import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from './loging/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private _jsonURL = '/assets/users.json';
  private _jsonURL = 'http://localhost:3000/users';
  
  isLoggedIn : boolean | undefined = false;
  user!  : User | undefined;
  users! : User[];
  redirectUrl! : string;
  
  constructor(private http: HttpClient) { }

  
  getUsers():Observable<User[]>{

    return this.http.get<User[]>(this._jsonURL);
  }
  
  login(email:string): Observable<User| undefined>  {
    //this.users = [];
    return this.getUsers().pipe(map((users: User[]) => {
      return users.find(user => user.username == email)
    }));
     
  
  }

  logOut(){
    this.isLoggedIn = false;
  }
  
}
