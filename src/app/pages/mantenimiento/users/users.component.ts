import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {

  public numberUsers: number = 0;
  public users: User[] = [];
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.userService.getUsers()
        .subscribe( ({ total, users}) => {
          
          this.numberUsers = total;
          this.users = users;
        })
  }

}
