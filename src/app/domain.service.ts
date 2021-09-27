import { Injectable } from '@angular/core';
import { Domain } from './domain';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DomainService {
  dummyDomains: Domain[] = [
    { id: 1, name: "yle.fi", groups: 3, index_page: "https://yle.fi/", annotations: [1,2,3] },
    { id: 2, name: "test.com", groups: 0, index_page: "https://test.com/index", annotations: [] },
    { id: 3, name: "kauppa.fi", groups: 1, index_page: "https://kauppa.fi/home", annotations: [1,2,3] }
  ]
  constructor() { }

  getDomains(): Observable<Domain[]> {
    return of(this.dummyDomains);
  }

}
