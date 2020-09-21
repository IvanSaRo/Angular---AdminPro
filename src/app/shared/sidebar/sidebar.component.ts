import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
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
  
  public user: User;
  constructor( private sidebarService: SidebarService, private userService: UserService) {

    this.menuItems = sidebarService.menu;

    this.user = this.userService.user;
   


    
   }

  ngOnInit(): void {
  }

}
