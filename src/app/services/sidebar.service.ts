import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor(private router: Router){}
  
  public menu = [];
  
  loadMenu(){
    this.menu = JSON.parse(localStorage.getItem('menu')) 

    if (this.menu.length === 0) {
      this.router.navigateByUrl('/login')
    }
  }
  /* menu:any[] = 
  [
    { titulo: 'Dashboard!', 
      icono: 'mdi mdi-gauge', 
      submenu: [
        { titulo: 'Main', url: '/'},
        { titulo: 'Gráficas', url: 'grafica1'},
        { titulo: 'Promesas', url: 'promesas'},
        { titulo: 'ProgressBar', url: 'progress'},
        { titulo: 'Rxjs', url: 'rxjs'},
      ]},
      { titulo: 'Mantenimiento', 
      icono: 'mdi mdi-folder-lock-open', 
      submenu: [
        { titulo: 'Usuarios', url: 'users'},
        { titulo: 'Médicos', url: 'doctors'},
        { titulo: 'Hospitales', url: 'hospitals'},
        
      ]}
  ] */
  
  
  
  
}
