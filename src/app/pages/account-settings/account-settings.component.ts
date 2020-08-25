import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  //saco estas dos declaraciones de sus funciones para no acceder al DOM cada vez que se activan las finciones, lo cual gasta innecesariamente recursos
  public linkTheme = document.querySelector('#theme');

  public links:  NodeListOf<Element>; //he de indicar los valores en ngOnInit ya que en ese momento ya se ha inicializado el componente y puede barrer los colores porque aún no se ha construido el html
  
  constructor() { }

  ngOnInit() {
    this.links = document.querySelectorAll('.selector');
    this.checkCurrentTheme();

  }



  changeTheme( theme: string){

   const url = `./assets/css/colors/${ theme }.css`;
   

   this.linkTheme.setAttribute('href', url);

   localStorage.setItem('theme', url);

   this.checkCurrentTheme();
  }

  checkCurrentTheme(){
    

    this.links.forEach( elem => {

      elem.classList.remove('working');

      const btnTheme = elem.getAttribute('data-theme');

      const btnThemeUrl = `./assets/css/colors/${ btnTheme }.css`;

      const currentTheme = this.linkTheme.getAttribute('href');

      if( btnThemeUrl === currentTheme ){

        elem.classList.add('working');

      }
    });


  }
}
