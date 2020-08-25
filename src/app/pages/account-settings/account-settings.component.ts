import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  

   //he de indicar los valores en ngOnInit ya que en ese momento ya se ha inicializado el componente y puede barrer los colores porque aún no se ha construido el html
  
  constructor( private settingsService: SettingsService) { }

  ngOnInit() {
    
    this.settingsService.checkCurrentTheme();

  }



  changeTheme( theme: string){

   this.settingsService.changeTheme( theme );
  }

  
}
