import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Annotation, GroupedAnnotations } from '../annotation';
import { AnnotationService } from '../annotation.service';
import { Domain } from '../domain';
import { DomainService } from '../domain.service';

@Component({
  selector: 'app-domain-annotations',
  templateUrl: './domain-annotations.component.html',
  styleUrls: ['./domain-annotations.component.css']
})
export class DomainAnnotationsComponent implements OnInit {
  domain: Domain = { id: 1, name: '', index_page: '', annotations: [], groups: 0 };
  annotations: GroupedAnnotations = [];

  constructor(private route: ActivatedRoute, private domainService: DomainService, private annotationService: AnnotationService) { }

  ngOnInit(): void {
    this.getDomain();
  }

  private getDomain(): void {
    this.domainService
      .getDomainById(Number(this.route.snapshot.paramMap.get('id')))
      .subscribe(domain => {
        if (domain !== null) {
          this.domain = domain;
          this.getAnnotations();
        }
      });
  }

  private getAnnotations(): void {
    this.annotationService
      .getDomainAnnotations(this.domain.id)
      .subscribe(annos => {
        annos.sort((a, b) => a.group - b.group);

        this.annotations = annos.reduce((grouped, anno) => {
          if (grouped.length > 0 && anno.group === grouped[grouped.length - 1][0].group)
            grouped[grouped.length - 1].push(anno);
          else
            grouped.push([anno]);

          return grouped;
        }, this.annotations);
      });
  }

}
