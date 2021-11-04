/* eslint-disable multiline-comment-style */
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subscription, of, pipe } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { HEROES } from './mock-heroes';

@Injectable({
    providedIn: 'root'
})
export class HeroDetailGuard implements CanActivate {

    constructor(private location: Location, private heroService: HeroService) {

    }
    async canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot):
        Promise<boolean> {
        const heroId = Number(route.paramMap.get('id'));
        if (isNaN(heroId)) {
            return this.invalidUrlEntry('Hero id provided is not a number. Please try again...');
        }
        const heroExists = await this.heroService.doesHeroExist(heroId);
        if (!heroExists) {
            return this.invalidUrlEntry(`Hero with id: ${heroId} is invalid. Please try again...`);
        }
        return true;
    }

    invalidUrlEntry(alertMessage: string) {
        alert(alertMessage);
        this.location.back()
        return false;
    }
    /*
     * const heroExists = HEROES.find(hero => hero.id == heroId);
     * if (!heroExists || isNaN(heroId)) {
     *     alert('Hero id is invalid. Please try again Sir...');
     *     this.location.back();
     *     return false;
     * }
     * return true;
     */

}
