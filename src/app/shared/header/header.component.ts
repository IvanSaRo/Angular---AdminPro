import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { SearchsService } from '../../services/searchs.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  public user: User;

  constructor(private userService: UserService, private searchService: SearchsService) {
    this.user = this.userService.user;
  }

  logout() {
    this.userService.logout();
  }

  search(query: string){
    this.searchService.searchAll(query)
                      .subscribe(res => console.log(res)
                      )
  }
}
