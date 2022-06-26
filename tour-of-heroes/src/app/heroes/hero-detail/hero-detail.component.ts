import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { IHeroes } from '../heroes';
import { HeroesService } from '../heroes.service';



@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero :IHeroes | undefined;

  Id : string | undefined;


  constructor( private route: ActivatedRoute,
    private router: Router,
    private service: HeroesService) { }

  ngOnInit(): void {
    // this.hero$ = this.route.paramMap.pipe(switchMap((params: ParamMap) =>
    //                                       this.service.getHero(params.get('id')!))
    // );
    this.route.paramMap.subscribe(params => {
      this.Id = params.get('id')!;
      console.log("$Este es el id:" + this.Id);
      let datos = this.service.getHero(this.Id!);
      datos.subscribe((items) => {
         this.hero = items;
         if(this.hero === undefined){
           //this.router.navigate(["./"]);
         }
         console.log(this.hero);
        })

    });


  }

  gotoHeroes(hero: IHeroes) {
    const heroId = hero ? hero.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Include a junk 'foo' property for fun.
    //this.router.navigate(['/superheroes', { id: heroId, name: hero.name }]);
    this.router.navigate(['../superheroes-list', { id: heroId }]);
    //this.router.navigate(['../', {id:heroId}],{relativeTo: this.route}).then(resolve => resolve);

  }

  close(){
    this.router.navigate(["./"]);
  }

}
