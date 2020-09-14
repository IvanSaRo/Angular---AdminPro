import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public auth2: any;

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
    private userService: UserService
  ) {}

  ngOnInit() {
    this.renderButton();
  }

  login() {
    this.userService.login(this.loginForm.value).subscribe(
      (res) => {
        if (this.loginForm.get('remember').value) {
          localStorage.setItem('email', this.loginForm.get('email').value);
          localStorage.setItem(
            'remember',
            this.loginForm.get('remember').value
          );
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('remember');
        }

         // navegar al dashboard
         this.router.navigateByUrl('/');
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
    // this.router.navigateByUrl('/');
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
    });
    this.startApp();
  }

  startApp() {
    gapi.load('auth2',  () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id:
          '1079830924924-jpp1eou8vupsvfb5ttcl3e159u8f10mr.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      this.attachSignin(document.getElementById('my-signin2'));
    }); 
  }

  attachSignin(element) {
    
    this.auth2.attachClickHandler(
      element,
      {},
      (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        // console.log(id_token);
        this.userService.loginGoogle( id_token )
                        .subscribe( res =>  {
                          // navegar al dashboard
                          this.router.navigateByUrl('/')
                        });

        // navegar al dashboard
        this.router.navigateByUrl('/');
      },
      (error) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }
}
