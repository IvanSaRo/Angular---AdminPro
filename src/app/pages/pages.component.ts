import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';


declare function customInitFunctions();//para que no de error aunque customInitFunctions() sea global y esté en assets/custom.js hay que declararlo

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  

  constructor( private settingsService: SettingsService) { }

  ngOnInit(): void {

    customInitFunctions();

  }

}