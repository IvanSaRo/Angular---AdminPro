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
  public from : number = 0;
  public loading: boolean = true;
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.chargeUsers();
  }

  changePage( value: number){
    this.from += value;

    if(this.from < 0){
      this.from = 0;
    }else if( this.from > this.numberUsers ){
      this.from -= value ;
    }

    this.chargeUsers();
  }

  chargeUsers(){
    this.loading = true;
    this.userService.getUsers(this.from)
        .subscribe( ({ total, users}) => {
      
      this.numberUsers = total;
      this.users = users;
      this.loading = false;
    })
  }
}
