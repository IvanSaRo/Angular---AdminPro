import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  base_url = environment.base_url;
  
  constructor( private http: HttpClient) { }


  createUser(formData: RegisterForm){
    
    return this.http.post(`${ this.base_url}/users`, formData )
    
  }


}


