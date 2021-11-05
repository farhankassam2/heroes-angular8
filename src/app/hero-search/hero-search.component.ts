import { Component, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
    selector   : 'app-hero-search',
    templateUrl: './hero-search.component.html',
    styleUrls  : ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
    heroes$!: Observable<Hero[]>;
    private searchTerms = new Subject<string>();

    constructor(private heroService: HeroService) {}

    ngOnInit(): void {
        this.searchTerms.pipe(
            // wait 300ms after each keystroke before considering the term
            debounceTime(300),
            // ignore new term if same as previous term
            distinctUntilChanged()
            /*
             * OPTION 1: Switch to new search observable each time the term changes.
             *          With the switchMap operator, every qualifying key event can trigger an HttpClient.get() method call.
             */
            // switchMap((term: string) => this.heroService.searchHeroes(term))
        ).subscribe({
            /*
             * OPTION 2: Below is another way of writing the above switchMap function: subscribe to the change Subject
             *          string and call searchHeroes upon a callback,
             *          which is further assigned to the this.heroes$ Observable. Async operator takes care of putting result of
             *          Observable<Hero[]> onto the HTML template.
             */
            next: (term: string) => {
                this.heroes$ = this.heroService.searchHeroes(term);
            }
        });
    }

    // push a search term into the observable stream
    search(term: string): void {
        this.searchTerms.next(term);
    }
}
