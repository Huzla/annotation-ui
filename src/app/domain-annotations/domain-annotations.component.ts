import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Annotation } from '../annotation';
import { AnnotationService } from '../annotation.service';
import { Domain } from '../domain';
import { DomainService } from '../domain.service';

@Component({
  selector: 'app-domain-annotations',
  templateUrl: './domain-annotations.component.html',
  styleUrls: ['./domain-annotations.component.css']
})
export class DomainAnnotationsComponent implements OnInit {
  domain?: Omit<Domain, "annotations">;
  annotations: Array<Annotation[]> = [];
  loaders: Function[] = [];

  annotationGroups: number[] = [];

  loading: Boolean[] = [];
  

  constructor(private route: ActivatedRoute, private domainService: DomainService, private annotationService: AnnotationService) { }

  ngOnInit(): void {
    this.getDomain();
  }


  private getDomain(): void {
    this.domainService
    .getDomainById(Number(this.route.snapshot.paramMap.get('id')))
    .subscribe(async domain => {
      // This array is used for creating a variable amount of virtual scrollers.
      // Making the loop indpenendet of the data arrays created later ensures that the loop won't rerender the scrollers
      // when data is modified.
      this.annotationGroups = Array.from(Array(domain.groups + 1).keys());

      // create lazy load handlers for each scroller.
      this.loaders = this.annotationGroups
      .map((group: number) => this.getAnnotationsFactory(group));

      

      // Create fixed sized arrays for the scrollers.
      const sizes = await Promise.all(this.annotationGroups.map(group => this.annotationService.getDomainGroupSize(domain.id, group).toPromise()));

      this.annotations = sizes.map(({ count }) => Array(count));


      this.loading = Array(domain.groups + 1).fill(true);

      this.domain = domain;
    });
  }

  private getAnnotationsFactory(group: number): Function {

    return async (event: LazyLoadEvent) => {
      this.loading[group] = true;

      console.log(event);

      if (this.domain && event.first !== undefined && event.rows !== undefined) {
        const annotations = await this.annotationService
          .getDomainAnnotationsSlice(this.domain.id, group, event.first, event.rows)
          .toPromise();

          console.log(this.annotations);

          this.loading[group] = false;

          Array.prototype.splice.apply(this.annotations[group], [(event.first as number), (event.rows as number), ...annotations]);

          this.annotations[group] = [...this.annotations[group]];
      }
        
    }
      
  }

}
