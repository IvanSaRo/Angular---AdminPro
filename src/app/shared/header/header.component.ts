import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  public user: User;

  constructor(private userService: UserService, private router: Router) {
    this.user = this.userService.user;
  }

  logout() {
    this.userService.logout();
  }

  search(query: string) {
    if (query.length === 0) {
      return;
    }
    this.router.navigate(['dashboard', 'search', `${query}`]);
  }
}
