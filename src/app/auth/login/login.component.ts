import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  
  
  public loginForm = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        Validators.required,
      ],
    ],
    password: ['', Validators.required],
    remember: [localStorage.getItem('remember') || false],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UsuarioService
  ) {

    
  }

 

  login() {
    this.userService.login(this.loginForm.value).subscribe(
      (res) => {
        if ( this.loginForm.get('remember').value) {
          localStorage.setItem('email', this.loginForm.get('email').value);
          localStorage.setItem('remember', this.loginForm.get('remember').value);
        }else{
          localStorage.removeItem('email');
          localStorage.removeItem('remember');

        }
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
    // this.router.navigateByUrl('/');
  }
}
