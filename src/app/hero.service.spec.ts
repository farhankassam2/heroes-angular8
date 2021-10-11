import { TestBed } from '@angular/core/testing';
import { Hero } from './hero';
import { catchError, map, tap } from 'rxjs/operators';

import { HeroService } from './hero.service';

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('asking for a hero detail by id specified in the query parameter returns the corresponding hero object with identical id', () => {
    const narcos: Hero = { id: 12, name: 'Narcos' };
    const heroFromService = service.getHero(12).subscribe(hero => {
      expect(hero).toBe(narcos);
    })
  });

  it('asking for a hero detail by id specified in the query parameter returns the corresponding hero object with identical id', () => {
    const narcos: Hero = { id: 12, name: 'Narcos' };
    service.getHero(12).pipe(
      tap(result => {
        expect(result).toBe(narcos);
      })
    )
  });

});
