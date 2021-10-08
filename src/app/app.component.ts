import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public _isDetailShowing: boolean = false;

  public isDetailShowing(value: boolean) {
    this._isDetailShowing = value;
  }
  constructor(private location: Location) {}
  title = 'Tour of Heroes';

  goBack(): void {
    this.isDetailShowing(false);
    this.location.back();
  }

}
