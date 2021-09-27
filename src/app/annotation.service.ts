import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Annotation } from './annotation';

@Injectable({
  providedIn: 'root'
})
export class AnnotationService {
  dummyAnnotations: Annotation[] = [
    { id: 1, url: "https://yle.fi/1/test1", group: 0, classes: ['article', 'article-author'] ,domain: 1 },
    { id: 2, url: "https://yle.fi/1/test2", group: 1, classes: ['article', 'article-author'] , domain: 1 },
    { id: 3, url: "https://yle.fi/1/test3", group: 1, classes: ['article'] ,domain: 1 },
    { id: 4, url: "https://yle.fi/2/test4", group: 2, classes: ['comments', 'sports-stuff', 'stats'] , domain: 1 },
    { id: 5, url: "https://yle.fi/2/test5", group: 2, classes: ['comments', 'sports-stuff', 'stats'] , domain: 1 },
    { id: 6, url: "https://yle.fi/3/test6", group: 3, classes: ['table-of-stats'] , domain: 1 },
    { id: 7, url: "https://kauppa.fi/products/phones/123456", group: 1, classes: ['product-name', 'product-description', 'price-value'], domain: 2 },
  ]
  
  constructor() { }

  getAnnotations(): Observable<Annotation[]> {
    return of(this.dummyAnnotations);
  }

  getDomainAnnotations(id: number): Observable<Annotation[]> {
    return of(this.dummyAnnotations.filter(anno => anno.domain === id));
  }
}
