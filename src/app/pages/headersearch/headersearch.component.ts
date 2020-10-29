import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SearchsService } from '../../services/searchs.service';

import { Doctor } from '../../models/doctor.model';
import { Hospital } from '../../models/hospital.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-headersearch',
  templateUrl: './headersearch.component.html',
  styles: [],
})
export class HeadersearchComponent implements OnInit {
  public users: User[] = [];
  public doctors: Doctor[] = [];
  public hospitals: Hospital[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchsService: SearchsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ term }) => {
      this.globalSearch(term);
    });
  }

  globalSearch(term: string) {
   this.searchsService.searchAll(term).subscribe((res): any => {
      this.users     = res.users;
      this.doctors   = res.doctors;
      this.hospitals = res.hospitals; 
      console.log(this.users,  this.doctors, this.hospitals ); 
      console.log(res)
      
    });
  }

  openDoctor(doctor: Doctor){
    this.router.navigateByUrl(`dashboard/doctor/${doctor._id}`);
  }
}
