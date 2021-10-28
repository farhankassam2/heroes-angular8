import { TestBed } from '@angular/core/testing';
import { Hero } from './hero';
import { catchError, map, tap } from 'rxjs/operators';

import { HeroService } from './hero.service';

// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HEROES } from './mock-heroes';

describe('HeroService testing', () => {
    let service: HeroService;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(HeroService);
        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('asking for a hero detail by id specified in the query parameter returns the corresponding hero object with identical id', () => {
        const narcos: Hero = HEROES[1];
        service.getHero(12).subscribe((hero) => {
            expect(hero).toEqual(narcos);
        });

    });


    xit('asking for a hero detail by id specified in the query parameter returns the corresponding hero object with identical id', () => {
        const narcos: Hero = { id: 12, name: 'Narcos' };
        service.getHero(12).pipe(
            tap((result) => {
                expect(result).toBe(narcos);
            })
        );
    });


    it('get list of heroes for heroes view', () => {
        // TODO: complete the test below and make it work on Karma browser.
        service.getHeroes().subscribe((heroes) => {
        // When observable resolves, result should match test data

            expect(heroes).toEqual(HEROES);
        });
        /*
         * The following `expectOne()` will match the request's URL.
         * If no requests or multiple requests matched that URL
         * `expectOne()` would throw.
         */
        const req = httpTestingController.expectOne('/heroes');
        // Assert that the request is a GET
        expect(req.request.method).toEqual('GET');

        /*
         * Respond with mock data, causing Observable to resolve.
         * Subscribe callback asserts that correct data was returned.
         */
        req.flush(HEROES);
    })

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    })
});
