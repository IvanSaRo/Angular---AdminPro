import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{
  
  
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
  ) {}

  ngOnInit(){
    this.renderButton();
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

  onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());

    var id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token);
    
  }

   onFailure(error) {
    console.log(error);
  }

   renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.onSuccess,
      'onfailure': this.onFailure
    });
}
}
