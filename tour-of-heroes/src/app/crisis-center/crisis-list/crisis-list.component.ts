import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterState } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { Crisis } from '../crisis';
import { CrisisService } from '../crisis.service';
import { Router } from '@angular/router';
import { CrisisDetailComponent } from '../crisis-detail/crisis-detail.component';

@Component({
  selector: 'app-crisis-list',
  templateUrl: './crisis-list.component.html',
  styleUrls: ['./crisis-list.component.css']
})
export class CrisisListComponent implements OnInit {

  //public crisisList : Observable<Crisis[]> | undefined;
  public crisisList: Crisis[] | undefined;
  selectedId = 0;
  //crisis : Observable<Crisis> | undefined;
  crisisObj!: Crisis;
  editName!: string;
  Id!: string;

  constructor(private _crisisServices: CrisisService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.Id = params.get('id')!;
      if (this.selectedId === null) {
        this.selectedId = parseInt(params.get('id')!, 10);
      }
      if (this.selectedId !== null) {
        this.selectedId = parseInt(params.get('id')!);
      }
      this._crisisServices.getCrisis().subscribe((crisis: Crisis[]) => {
        this.crisisList = crisis;
      });

    });

  }



  public gotoCrises() {
    //const crisisId = this.crisis ? this.crisis.id : null;

    // Pass along the crisis id if available
    // so that the CrisisListComponent can select that crisis.
    // Add a totally useless `foo` parameter for kicks.
    // Relative navigation back to the crises

    //this.router.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.route });
  }

  onSelected(crisis: Crisis) {
    this.selectedId = crisis.id;

    this.router.navigate(['/crisisList/crisisDetail', { id: this.selectedId }]);

  }


}
