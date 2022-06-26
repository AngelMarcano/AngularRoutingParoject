import { Component } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { slideInAnimation } from './animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation ]
})
export class AppComponent {
  title = 'tour-of-heroes';
  items: string[] = [];

  constructor(private contexts: ChildrenOutletContexts){
    
  }

  ngOnInit(): void{
    this.items = ["Uno", "Dos", "Tres"];

  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
