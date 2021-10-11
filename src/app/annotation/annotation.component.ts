import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Annotation } from '../annotation';
import { AnnotationService } from '../annotation.service';
import { DomainService } from '../domain.service';

@Component({
  selector: 'app-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.css']
})
export class AnnotationComponent implements OnInit {
  domainId: number = 0;
  annotationId: number = 0;

  groups: number[] = [];
  selectedGroup: number = 0;
  documentUrl: string = '';

  annotation?: Annotation;

  @ViewChild('documentViewer')
  documentElement!: ElementRef;

  cssClasses: Set<string> = new Set(); 

  constructor(private route: ActivatedRoute,
    private annotationService: AnnotationService,
    private domainService: DomainService) { }


  ngOnInit(): void {
    this.domainId = Number(this.route.snapshot.paramMap.get('domainId'));
    this.annotationId = Number(this.route.snapshot.paramMap.get('annotationId'));
    this.documentUrl = `${ environment.apiUrl }/domains/${ this.domainId }/${ this.annotationId }/document`
    this.getDomain();
    this.getAnnotation();
  }

  private async getAnnotation() {
    this.annotation = await this.annotationService
      .getAnnotationById(this.domainId, this.annotationId)
      .toPromise();
  }

  private async getDomain() {
    this.groups = Array.from(Array((await this.domainService.getDomainById(this.domainId).toPromise()).groups).keys());
  }

  selectGroup(group: number) {
    this.selectedGroup = group;
  }

  updateClassList(classes: Set<string>) {
    this.cssClasses = classes;
  }

}
