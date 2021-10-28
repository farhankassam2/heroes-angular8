import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HeroService } from './hero.service';

@Injectable({
    providedIn: 'root'
})
export class HeroDetailGuard implements CanActivate {

    constructor(private router: Router, private heroService: HeroService) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        const heroId = Number(route.paramMap.get('id'));
        const value = this.heroService.getHeroes().subscribe((heroes) => {
            const heroExists = heroes.find(hero => hero.id == heroId);
            if (!heroExists || isNaN(heroId)) {
                return false;
            }
            return true;
        });
      return of(value);
    }
}
