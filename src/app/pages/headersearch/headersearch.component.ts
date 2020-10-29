import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchsService } from '../../services/searchs.service';

@Component({
  selector: 'app-headersearch',
  templateUrl: './headersearch.component.html',
  styles: [
  ]
})
export class HeadersearchComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private searchsService: SearchsService) { }

  ngOnInit(): void {
    this.activatedRoute.params
        .subscribe( ({term}) => {
          this.searchsService.searchAll(term)
                     .subscribe((res): any => {
                      // const {doctors, users, hospitals} = res 
                      console.log(res)
                      
                     })
          
        })
  }

  


}
