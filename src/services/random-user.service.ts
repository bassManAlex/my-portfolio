import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Api } from './api';

@Injectable()
export class RandomUserService {

  constructor(private http: HttpClient) { }

  getUser(): Observable<any> {
    return this.http.get<any>(Api.USER);
  }
}
