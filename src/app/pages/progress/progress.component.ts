import { Component } from '@angular/core';


@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [ './progress.component.css']
})
export class ProgressComponent {

  
  progress: number = 5;

  get getPorcentaje(){

    return `${ this.progress}%`;
  }

  cambiarValor( valor:number){

    if(this.progress >= 100 && valor >= 0){
      return this.progress = 100;
    }else if( this.progress <= 0 && valor < 0){
      return this.progress = 0;
    }

    this.progress = this.progress + valor;
  }
}
