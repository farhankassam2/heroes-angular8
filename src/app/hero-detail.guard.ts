import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HeroService } from './hero.service';
import { HEROES } from './mock-heroes';

@Injectable({
    providedIn: 'root'
})
export class HeroDetailGuard implements CanActivate {

    constructor(private location: Location, private heroService: HeroService) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot):
      Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        const heroId = Number(route.paramMap.get('id'));
        // TODO: make the below work with the http call
        /*
         * const value = this.heroService.getHeroes().subscribe((heroes) => {
         *     const heroExists = heroes.find(hero => hero.id == heroId);
         *     if (!heroExists || isNaN(heroId)) {
         *         return false;
         *     }
         *     return true;
         * });
         */
        const heroExists = HEROES.find(hero => hero.id == heroId);
        if (!heroExists || isNaN(heroId)) {
            alert('Hero id is invalid. Please try again Sir...');
            this.location.back();
            return false;
        }
        return true;

    }
}
