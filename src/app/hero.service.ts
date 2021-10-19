import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HeroService {
    // Below: message service is injected into the hero service property.
    constructor(private messageService: MessageService, private http: HttpClient) {}

    private heroesUrl = 'api/heroes'; // URL to web api of the format :base/:collectionName

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    /* GET heroes from the server */
    getHeroes(): Observable<Hero[]> {
        // const heroes = of(HEROES);
        return (
            this.http
                .get<Hero[]>(this.heroesUrl)
                // returns an Observable<Hero[]> type
                .pipe(
                    tap(() => this.log('fetched ALL heroes successfully!')),
                    catchError(this.handleError<Hero[]>('getHeroes', []))
                )
        );
    }

    /**
     * GET hero by id. Will 404 if id not found
     *
     * @returns Promised Hero
     * @param id
     */
    getHero(id: number): Observable<Hero> {
        /*
         * const hero = HEROES.find(h => h.id === id)!;
         * return of(hero);
         */
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get<Hero>(url).pipe(
            tap(() => this.log(`fetched hero with id: ${id}`)),
            catchError(this.handleError<Hero>(`getHero id=${id}`))
        );
    }

    /**
     * PUT: update the hero on the server
     *
     * @param hero
     */
    updateHero(hero: Hero): Observable<any> {
        return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
            tap((_) => this.log(`updated hero with id: ${hero.id}`)),
            catchError(this.handleError<any>('updateHero'))
        );
    }

    /**
     * POST: add a new hero to the server. Return 404 upon failing.
     *
     * @param hero
     */
    addHero(hero: Hero): Observable<Hero> {
        return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
            tap((newHero: Hero) => this.log(`added hero with id:${newHero.id}`)),
            catchError(this.handleError<Hero>('addHero'))
        );
    }

    /**
     * DELETE: delete the hero from the server
     *
     * @param id
     */
    deleteHero(id: number): Observable<Hero> {
        const url = `${this.heroesUrl}/${id}`;

        return this.http.delete<Hero>(url, this.httpOptions).pipe(
            tap((_) => this.log(`deleted hero with id: ${id}`)),
            catchError(this.handleError<Hero>('deleteHero'))
        );
    }

    /**
     * GET heroes whose name contains the search term
     *
     * @param term
     */
    searchHeroes(term: string): Observable<Hero[]> {
        if (!term.trim()) {
            return of([]);
        }

        return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
            tap((x) => (x.length ? this.log(`found heroes matching "${term}"`) : this.log(`no heroes matching "${term}"`))),
            catchError(this.handleError<Hero[]>('searchHeroes', []))
        );
    }

    /**
     * Log a HeroService message with the MessageService
     *
     * @param message
     */
    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     *
     * @returns result of unknown type T
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
