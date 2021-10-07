import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PopulatedDomain } from './domain';
import { Annotation } from './annotation';

@Injectable({
  providedIn: 'root'
})
export class AnnotationService {
  private domainsUrl = `${ environment.apiUrl }/domains`;

  constructor(
    private http: HttpClient
  ) { }

  getDomainAnnotations(id: number): Observable<Annotation> {
    return this.http.get<Annotation>(`${ this.domainsUrl }/${ id }`);
  }

  getDomainAnnotationsSlice(id: number, group: number, start: number, rows: number): Observable<Annotation[]> {
    return this.http.get<Annotation[]>(`${ this.domainsUrl }/${ id }/groups/${ group }?rows=${ rows }&start=${ start }`);
  }

  getDomainGroupSize(id: number, group: number): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${ this.domainsUrl }/${ id }/groups/${ group }/count`);
  }
}
