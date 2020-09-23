import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }


 async  updatePhoto(
   archive: File,
   type: 'users' | 'doctors' | 'hospitals',
   id: string
 ){

  try {

    const url = `${ base_url }/upload/${ type }/${ id }`;

    const formData = new FormData();

    formData.append('img', archive);

    const resp = await fetch( url, {
      method: 'PUT',
      headers: {
        'x-token': localStorage.getItem('token') || ''
      },
      body: formData
    });

    const data = await resp.json();

    console.log(data);
    

    return 'nombre img';

    
  } catch (error) {
    console.log(error)
    
    return false;
  }
 }
}
