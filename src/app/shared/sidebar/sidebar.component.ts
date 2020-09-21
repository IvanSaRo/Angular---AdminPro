import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {


  public menuItems: any[];
  
  public imgUrl= '';
  public name= '';
  constructor( private sidebarService: SidebarService, private userService: UserService) {

    this.menuItems = sidebarService.menu;
    this.imgUrl = this.userService.user.imgUrl;
    this.name = this.userService.user.name;


    
   }

  ngOnInit(): void {
  }

}
