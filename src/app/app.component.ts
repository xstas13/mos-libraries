import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LibrariesComponent } from "./libraries/libraries.component";

@Component({
  selector: 'app-root',
  imports: [
    LibrariesComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
