import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent{

  @Input('valor') progress: number = 5;

  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter();

  cambiarValor( valor:number){

    if(this.progress >= 100 && valor >= 0){
      this.valorSalida.emit(100);
      return this.progress = 100;
    }else if( this.progress <= 0 && valor < 0){
      this.valorSalida.emit(0);
      return this.progress = 0;
    }
    
    this.progress = this.progress + valor;
    this.valorSalida.emit( this.progress );
  }

}
