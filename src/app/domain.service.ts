import { Injectable } from '@angular/core';
import { Domain } from './domain';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DomainService {
  private domainsUrl = `${ environment.apiUrl }/domains`;
  
  constructor(
    private http: HttpClient
  ) { }

  getDomains(): Observable<Domain[]> {
    return this.http.get<Domain[]>(this.domainsUrl);
  }

  getDomainById(id: number): Observable<Domain> {
    return this.http.get<Domain>(`${ this.domainsUrl }/${ id }`);
  }

}
