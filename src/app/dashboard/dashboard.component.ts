import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  topHeroes: Hero[] = [];

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit() {
  	this.getHeroes();
  }

  getHeroes(): void {
  	this.heroService.getHeroes()
  		.subscribe(heroes => {
  			this.topHeroes = heroes.slice(1, 5);
  			this.messageService.add('Dashboard: Top 4 heroes loaded successfully!');
  		});
    
  }
}
