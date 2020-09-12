import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;
  
  
  public registerForm = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),Validators.required]],
    password: ['', Validators.required],
    reapeatPassword: ['', Validators.required],
    terms: [false, Validators.required]
  });
  
  
  constructor(private fb: FormBuilder) { }

  createUser(){
    this.formSubmitted = true;
    console.log(this.registerForm.value)

    if(this.registerForm.valid){
      console.log('posteando form')
      
    }else{
      console.log('formulario incorrecto')
      
    }
    
  };



  fieldInvalid( field: string): boolean{

    if( this.registerForm.get(field).invalid && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

  acceptTerms(){
    return !this.registerForm.get('terms').value && this.formSubmitted
  }
}
