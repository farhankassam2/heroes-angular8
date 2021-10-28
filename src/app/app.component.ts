import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.css']
})
export class AppComponent implements OnInit {
    public _isDetailShowing: boolean = false;
    // public htmlSnippet: SafeHtml = '';
    public title = 'Tour of Heroes';


    public isDetailShowing(value: boolean) {
        this._isDetailShowing = value;
    }
    constructor(private location: Location, private sanitizer: DomSanitizer) {
        // this.htmlSnippet = this.sanitizer.bypassSecurityTrustHtml('<script src="https://amazon.com"></script>');

    }

    ngOnInit() {
        window.addEventListener('securitypolicyviolation',
            console.error.bind(console));
    }

    goBack(): void {
        this.isDetailShowing(false);
        this.location.back();
    }
}
