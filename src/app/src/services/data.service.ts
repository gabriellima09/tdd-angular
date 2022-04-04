import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getHomes$() {

    return this.httpClient.get('assets/homes.json');

  }

  bookHome$(){
    return of(null);
  }
}