import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
	selector: 'app-heroes',
	templateUrl: './heroes.component.html',
	styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  newHeroName: string = '';
  constructor(private heroService: HeroService) {
  }

  ngOnInit(): void {
  	this.getHeroes();
  }


  getHeroes(): void {
  	this.heroService.getHeroes()
  		.subscribe(heroes => this.heroes = heroes);
  }

  addHero(): void {
  	this.newHeroName = this.newHeroName.trim();
  	if (!this.newHeroName)  {return;} 
  	this.heroService.addHero({ name: this.newHeroName } as Hero)
  		.subscribe(() => {
  			this.getHeroes(); // want to call a new getHeroes() after having added a hero so as to retrieve most up to date list
  			this.newHeroName = '';
  		});
  }

  deleteHero(hero: Hero): void {
  	this.heroes = this.heroes.filter(h => h.id !== hero.id); // deletes before server deletion has been successful, otherwise it will try to render a non-existent hero.
  	this.heroService.deleteHero(hero.id).subscribe(() => {});
  }

}
