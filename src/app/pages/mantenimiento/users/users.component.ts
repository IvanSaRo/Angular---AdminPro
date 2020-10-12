import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { User } from 'src/app/models/user.model';

import { ModalImgService } from '../../../services/modal-img.service';
import { SearchsService } from '../../../services/searchs.service';
import { UserService } from '../../../services/user.service';

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
    private searchService: SearchsService,
    private modalImgService: ModalImgService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  changePage(value: number) {
    this.from += value;

    if (this.from < 0) {
      this.from = 0;
    } else if (this.from > this.numberUsers) {
      this.from -= value;
    }

    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.userService.getUsers(this.from).subscribe(({ total, users }) => {
      this.numberUsers = total;
      this.users = users;
      this.usersTemp = users;
      this.loading = false;
    });
  }

  search(term: string) {
    if (term.length === 0) {
      return (this.users = this.usersTemp);
    }

    this.searchService.search('users', term).subscribe((res) => {
      console.log(res);

      this.users = res;
    });
  }

  deleteUser(user: User) {
    if (user.uid === this.userService.user.uid) {
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    }

    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Estás a punto de borrar a ${user.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, bórralo',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user).subscribe((res) => {
          Swal.fire('Usuario borrado', 'El usuario ha sido borrado', 'success'),
            (err) => console.log;

          this.loadUsers();
        });
      }
    });
  }

  changeRole(user: User) {
    this.userService.updateRole(user).subscribe((res) => {
      Swal.fire(
        'Rol cambiado',
        'El rol del usuario ha sido cambiado',
        'success'
      ),
        (err) => console.log;
    });
  }

  openModal( user: User){
    console.log(user);
    this.modalImgService.openModal('users', user.uid, user.img);
    
  }
}
