import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnDestroy {
 
  public intervalSubs: Subscription;
 
  constructor() {
    /*   this.returnObservable().pipe(
      retry(1)
    ).subscribe( 
      valor => console.log('Subs', valor),
      error => console.warn('Error', error),
      () => console.info('Obs terminado')
    ); */

    this.intervalSubs = this.returnInterval().subscribe(console.log);
  }

  ngOnDestroy() {
    this.intervalSubs.unsubscribe();
  }
  
  returnInterval(): Observable<number> {
    return interval(500)
    .pipe(
      map((valor) => {
        return valor + 1;
      }),
      filter( valor => ( valor % 2 === 0) ? true : false ),// al ser secuencial coge 10 que cumplan las características anteriores
      take(1000)
    );
  }

  //  returnObservable(): Observable<number>{
  //     let i = 0;

  //     const obs$ = new Observable<number>( observer => {

  //       const intervalo = setInterval( () => {

  //         i++;
  //         observer.next(i);//emitimos

  //         if( i === 4){
  //           clearInterval( intervalo);
  //           observer.complete();
  //         };

  //         if( i === 2){
  //           // i = 0;
  //           observer.error('i llegó a 2');
  //         }

  //       }, 1000)

  //     });

  //     return obs$;
  //   }
}
