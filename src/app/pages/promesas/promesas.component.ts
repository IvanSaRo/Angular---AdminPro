import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

   this.getUsuarios().then( usuarios => {
     console.log( usuarios );
     
   })
   
   
  
    
  }

  getUsuarios(){

  /*   const promesa = new Promise( resolve => {

      fetch('https://rickandmortyapi.com/api/character/')
        .then( resp => resp.json()
        .then(body => resolve( body.results) )
        );

    });

    return promesa;
    
  } */

  return new Promise( resolve => {


    fetch('https://rickandmortyapi.com/api/character/')
      .then( resp => resp.json())
      .then( body => resolve( body.results))
  });

}

}