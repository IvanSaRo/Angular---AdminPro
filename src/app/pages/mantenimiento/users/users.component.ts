import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../../services/user.service';
import { SearchsService } from '../../../services/searchs.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [],
})
export class UsersComponent implements OnInit {
  public numberUsers: number = 0;
  public users: User[] = [];
  public from: number = 0;
  public loading: boolean = true;
  public usersTemp: User[] = [];

  constructor(
    private userService: UserService,
    private searchService: SearchsService
  ) {}

  ngOnInit(): void {
    this.chargeUsers();
  }

  changePage(value: number) {
    this.from += value;

    if (this.from < 0) {
      this.from = 0;
    } else if (this.from > this.numberUsers) {
      this.from -= value;
    }

    this.chargeUsers();
  }

  chargeUsers() {
    this.loading = true;
    this.userService.getUsers(this.from).subscribe(({ total, users }) => {
      this.numberUsers = total;
      this.users = users;
      this.usersTemp = users;
      this.loading = false;
    });
  }

  search(term: string) {
    if(term.length === 0){ return this.users = this.usersTemp;}
    
    this.searchService.search('users', term).subscribe((res) => {
      console.log(res);

      this.users = res;
    });
  }
}
