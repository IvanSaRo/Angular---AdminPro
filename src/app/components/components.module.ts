import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { DonutComponent } from './donut/donut.component';

import { ChartsModule } from 'ng2-charts';
import { ModalImgComponent } from './modal-img/modal-img.component';



@NgModule({
  declarations: [IncrementadorComponent, DonutComponent, ModalImgComponent],
  imports: [
    CommonModule, 
    FormsModule,
    ChartsModule
  ],
  exports: [ 
    IncrementadorComponent,
    DonutComponent,
    ModalImgComponent
   ]
})
export class ComponentsModule { }
