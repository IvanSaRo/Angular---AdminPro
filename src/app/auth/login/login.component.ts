import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm = this.fb.group({
    email: [
      'dummy@gmail.com',
      [
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        Validators.required,
      ],
    ],
    password: ['654321', Validators.required],
    remember: [false],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UsuarioService
  ) {}

  ngOnInit(): void {}

  login() {
    this.userService.login(this.loginForm.value).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
    // this.router.navigateByUrl('/');
  }
}
