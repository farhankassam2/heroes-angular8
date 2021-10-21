import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { AppComponent } from '../app.component';
import { Location } from '@angular/common';
@Component({
    selector   : 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls  : ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
    @Input() hero?: Hero;

    constructor(
        private route: ActivatedRoute,
        private heroService: HeroService,
        public appComponentSingleton: AppComponent,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.enteringDetailShowing();
        this.getHero();
    }

    // #region Public methods
    enteringDetailShowing() {
        this.appComponentSingleton.isDetailShowing(true);
    }
    getHero(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.heroService.getHero(id).subscribe((hero) => {
            this.hero = hero;
        });
    }

    // @ts-ignore
    goBack() {
    this.location.back()
    }

    save(): void {
        if (this.hero) {
            this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
        }
    }
    // #endregion
}
