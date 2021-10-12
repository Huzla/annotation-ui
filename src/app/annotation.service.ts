import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PopulatedDomain } from './domain';
import { Annotation } from './annotation';

@Injectable({
  providedIn: 'root'
})
export class AnnotationService {
  private domainsUrl = `${ environment.apiUrl }/domains`;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

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

  getAnnotationById(domainId: number, annotationId: number): Observable<Annotation> {
    return this.http.get<Annotation>(`${ this.domainsUrl }/${ domainId }/${ annotationId }`);
  }

  putAnnotation(annotation: Annotation) {
    return this.http.put<Annotation>(`${ this.domainsUrl }/${ annotation.domain }/${ annotation.id }`, annotation, this.httpOptions);
  }
}
