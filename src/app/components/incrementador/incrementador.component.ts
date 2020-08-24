import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit{
  ngOnInit() {
    /* this.btnClass = `btn ${this.btnClass}`; si implemento ésto en el Input btnClass solo tendría que pasarle el btn-color */
  }

  @Input('valor') progress: number = 5;
  @Input() btnClass: string = 'btn btn-primary'

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

  onChange( nuevoValor: number ){
    if( nuevoValor >= 100){
      this.progress = 100;
    }else if( nuevoValor <= 0){
      this.progress = 0;
    }else{
      this.progress = nuevoValor;
    }
   
    this.valorSalida.emit( nuevoValor );
  }

}
