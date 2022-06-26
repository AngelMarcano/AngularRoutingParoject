import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, NavigationExtras, ParamMap, Route, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CrisisService } from 'src/app/crisis-center/crisis.service';
import { Crisis } from 'src/app/crisis-center/crisis';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-manage-crisis',
  templateUrl: './manage-crisis.component.html',
  styleUrls: ['./manage-crisis.component.css']
})
export class ManageCrisisComponent implements OnInit {

  url!: any;
  crisisForm = new FormGroup({
    crisisName: new FormControl('', Validators.required),
  });
  selectedId = 0;
  crisisList : Crisis[] =[];
  response: Crisis = { id: 0, name: ""};

  constructor(private route: ActivatedRoute, private httpCrisisService:CrisisService, private router: Router,) {
    this.httpCrisisService.getCrisis().subscribe(crisisResponseList => this.crisisList = crisisResponseList);

  }

  ngOnInit(): void {
    this.route.data.subscribe((preloaded: Data) => {

      console.log('preloaded data Subscribe2: ' + JSON.stringify(preloaded))
    });



    this.route.url.subscribe((url: any) => {
      this.url = url;
      console.log('preloaded data Subscribe2: ' + JSON.stringify(url))
    });
    console.log('preloaded url Subscribe3: ' + JSON.stringify(this.url))

  }

  SaveCrisis(){
    console.warn(this.crisisForm.value);
    let crisisName = this.crisisForm.get('crisisName')?.value as string;
    console.log("El nombre de crisis es: " + crisisName);



    let lastIndex = this.crisisList.length;

    const newCrisis : Crisis = { id: lastIndex + 1, name : crisisName};
    //this.crisisList.push(newCrisis);
    this.httpCrisisService.addCrisisManage(newCrisis).subscribe(crisisResponse => {
       console.log("Respuesta al post: " + crisisResponse);
       this.crisisForm.reset();

    }),
    (err: HttpErrorResponse) => {
      console.log(err.message);
    };
    this.goToCrisis();

   }


   goToCrisis(){
    let lastIndex = this.crisisList.length + 1;

    this.router.navigate(['/crisisList', { id: lastIndex.toString() }]);
   }
}
