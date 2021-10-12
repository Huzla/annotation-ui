import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
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
  selectedClasses: Set<string> = new Set();
  documentUrl: string = '';

  annotation?: Annotation;

  classInFocus?: string;
  classInFocusSubject: Subject<string> = new Subject<string>();
  classAddSubject: Subject<string> = new Subject<string>();
  classDeleteSubject: Subject<string> = new Subject<string>();


  cssClasses: Set<string> = new Set();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private annotationService: AnnotationService,
    private domainService: DomainService) { }


  ngOnInit(): void {
    this.domainId = Number(this.route.snapshot.paramMap.get('domainId'));
    this.annotationId = Number(this.route.snapshot.paramMap.get('annotationId'));
    this.documentUrl = `${ environment.apiUrl }/domains/${ this.domainId }/${ this.annotationId }/document`
    this.getDomain();
    this.getAnnotation();
  }

  private async getAnnotation(): Promise<void> {
    this.annotation = await this.annotationService
      .getAnnotationById(this.domainId, this.annotationId)
      .toPromise();

    this.selectedGroup = this.annotation.group;

    if (this.annotation.classes.length) {
      this.selectedClasses = new Set(this.annotation.classes);
    }
  
  }

  private async getDomain(): Promise<void> {
    this.groups = Array.from(
      Array((await this.domainService.getDomainById(this.domainId).toPromise()).groups)
      .keys()
    )
    .map((group: number) => group + 1);
  }

  selectGroup(group: number): void {
    this.selectedGroup = group;
  }

  updateClassList(classes: Set<string>): void {
    this.cssClasses = classes;

    this.selectedClasses.forEach((c: string) => {
      this.classAddSubject.next(c);
    });
  }

  focusOnClass(c: string): void {
    if (this.classInFocus !== c) {
      this.classInFocus = c;
      this.classInFocusSubject.next(c);
    }
    
  }

  toggleSelection(c: string): void {
    if (this.selectedClasses.has(c)) {
      this.selectedClasses.delete(c);
      this.classDeleteSubject.next(c);
    }
    else {
      this.selectedClasses.add(c);
      this.classAddSubject.next(c);
    }
  }

  determineClassColor(c: string): string {
    if (this.selectedClasses.has(c)) {
      return 'success';
    }
    else if (c === this.classInFocus) {
      return 'danger';
    }
    else {
      return 'secondary';
    }
  }

  async sendModifications(): Promise<void> {
    //TODO: Add error messaging.
    if (this.selectedGroup > 0 && this.annotation) {
      await this.annotationService.putAnnotation({ 
        ...this.annotation, 
        domain: this.domainId,
        group: this.selectedGroup, 
        classes: Array.from(this.selectedClasses).filter((s: string) => s !== '')
      }).toPromise();

      this.router.navigate([`/domains/${ this.domainId }`])
    }
  }

}
