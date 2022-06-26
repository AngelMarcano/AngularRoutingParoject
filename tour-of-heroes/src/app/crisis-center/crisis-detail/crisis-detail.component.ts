import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Navigation, NavigationExtras, ParamMap, Router, RouterState } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';

import { Crisis } from '../crisis';
import { CrisisService } from '../crisis.service';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.css']
})
export class CrisisDetailComponent implements OnInit {


  crisis: Crisis = {
    id: 0,
    name: ''
  };
  editName = '';
  Id: string | undefined;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private _crisisService: CrisisService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.Id = params.get('id')!;

      this._crisisService.getCrisisById(this.Id!).subscribe((item) => {
        this.crisis = item!;
        // let urlTemp!: null;
        // console.log(urlTemp);
        if(this.crisis){
        this.editName = this.crisis.name!;
        console.log("$Este es el id:" + this.crisis.id);
        }

      });

    });


  }

  cancel() {
    this.gotoCrises();
  }

  save(crisis: Crisis) {
    this.crisis.name = this.editName;
    this._crisisService.updateCrisis(crisis).subscribe((data: Crisis) => {
      console.log(data);

    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
    this.gotoCrises();
  }

  public gotoCrises() {
    const crisisId = this.crisis ? this.crisis.id : null;
    // Pass along the crisis id if available
    // so that the CrisisListComponent can select that crisis.
    // Add a totally useless `foo` parameter for kicks.
    // Relative navigation back to the crises
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.Id = params.get('id')!;
      this._crisisService.getCrisisById(this.Id!).subscribe((items) => {
        this.crisis = items!;

      });
    });



      //this.router.navigate(['./', { id: this.crisis.id, name: this.crisis.name }]);
      this.router.navigate(['./', { id: this.crisis.id }]);

  }

  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (!this.crisis || this.crisis.name === this.editName) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.confirm('Discard changes?');
  }

  confirm(message?: string): Observable<boolean> {
    const confirmation = window.confirm(message || 'Is it OK?');

    return of(confirmation);
  }

}
