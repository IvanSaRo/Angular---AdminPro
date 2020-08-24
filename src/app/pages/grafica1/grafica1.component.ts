import { Component } from '@angular/core';



@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public labels1: string[] = ['Ventas por internet', 'Ventas en tienda', 'Ventas por correo'];
  public labels2: string[] = ['Compras material', 'Compras equipo', 'Cosmpras servicios'];
  public labels3: string[] = ['Indefinido', 'Prácticas', 'Temporal'];
  public labels4: string[] = ['Créditos PYME', 'Avales', 'ICO'];
  
  public data1 = [[300, 300, 300]];
  public data2 = [[300, 150, 450]];
  public data3 = [[100, 50, 750]];
  public data4 = [[550, 100, 250]];
  
  public colors1 = [{backgroundColor: ['#6857E6', '#009FEE', '#F02059' ]}];
  public colors2 = [{backgroundColor: ['#F02059', '#6857E6', '#009FEE' ]}];

 
 
}
