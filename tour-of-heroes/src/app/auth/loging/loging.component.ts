import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from './user';

@Component({
  selector: 'app-loging',
  templateUrl: './loging.component.html',
  styleUrls: ['./loging.component.css']
})
export class LogingComponent implements OnInit {
 userResult! : User;
 isLoggedMessage : number | undefined;
 

  constructor(public authService:AuthService , private router: Router ) { 
    console.log(this.authService.isLoggedIn);
  }

  ngOnInit(): void {
    this.isLoggedMessage = 0;
  }

  login(email:string){
    if(email === ""){
      this.isLoggedMessage = 3;
    return;
    }
    
    this.authService.login(email!).subscribe(user => {
      this.userResult  =  user!;
      if(this.userResult !==  null && this.userResult !== undefined){
        this.authService.isLoggedIn = true;
        
        this.isLoggedMessage = 1;
        console.log("El valor del isLoggedIn es: " + JSON.stringify(this.userResult));
        console.log("Ususario está logueado?: " + this.authService.isLoggedIn);
        // Navigate to the login page with extras
         // Set our navigation extras object
        // that passes on our global query params and fragment
        const navigationExtras: NavigationExtras = {
          queryParamsHandling: 'preserve',
          preserveFragment: true
        };
        this.router.navigate(['/admin'], navigationExtras);
      }
      else {
        this.authService.isLoggedIn = false;
        
        this.isLoggedMessage = 2;
        console.log("El valor del isLoggedIn es: " + JSON.stringify(this.userResult!));
        console.log("Ususario está logueado?: " + this.authService.isLoggedIn);
      }
    });
    
  }

  logOut(){
    this.authService.isLoggedIn = false;
  }

  close(){
    this.isLoggedMessage = 0;
  }

}
function navigationExtras(arg0: string[], navigationExtras: any) {
  throw new Error('Function not implemented.');
}

