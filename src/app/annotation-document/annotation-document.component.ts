import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';

const focusHighlightClass: string = 'focused-item';
const selectedClass: string = 'selected-item';

@Component({
  selector: 'app-annotation-document',
  templateUrl: './annotation-document.component.html',
  styleUrls: ['./annotation-document.component.css']
})
export class AnnotationDocumentComponent implements OnInit {

  @ViewChild('iframe')
    iframe!: ElementRef;

  @Input() documentUrl: string = '';
  _safeUrl: SafeResourceUrl = '';

  @Input() classInFocus!: Observable<string>;
  @Input() classAdd!: Observable<string>;
  @Input() classDelete!: Observable<string>;

  @Output()
  classesEvent = new EventEmitter<Set<string>>();

  private subscriptions: Subscription[] = [];

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this._safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.documentUrl);

    this.subscriptions.push(this.classInFocus.subscribe((className: string) => {
      this.removeClassFromIframe(focusHighlightClass, focusHighlightClass);

      this.addClassToIframe(className, focusHighlightClass);
      
      this.scrollTo(className);
    }));

    this.subscriptions.push(this.classAdd.subscribe((className: string) => {
      this.addClassToIframe(className, selectedClass);
    }));

    this.subscriptions.push(this.classDelete.subscribe((className: string) => {
      this.removeClassFromIframe(className, selectedClass);
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private removeClassFromIframe(target: string, className: string): void {
    this.iframe.nativeElement.contentDocument
        .querySelectorAll(this.stringToClassSelector(target))
        .forEach((element: HTMLElement) => {
          element.classList.remove(className);
        });
  }

  // Note that target can consist of multiple classes.
  private addClassToIframe(target: string, newClassName: string): void {
    this.iframe.nativeElement.contentDocument
        .querySelectorAll(this.stringToClassSelector(target))
        .forEach((element: HTMLElement) => {
          element.classList.add(newClassName);
        });
  }

  private stringToClassSelector(className: string) {
    return '.' + className.replace(/ /gi, '.');
  }

  private scrollTo(target: string) {
    (this.iframe.nativeElement.contentDocument.querySelector(this.stringToClassSelector(target)) as Element).scrollIntoView(true);
  }

  outputClasses(): void {
    const cssString = `
      .focused-item {
          border: 1rem solid #00FFFF;
          border-radius: 0.2rem;
          filter: invert(100%);
      }

      .selected-item {
        border: 1rem solid #00FF00;
        border-radius: 0.2rem;
        background-color: #00FF00;
      }
    `;

    const styleElem = this.iframe.nativeElement.contentDocument.createElement('style');
    styleElem.appendChild(this.iframe.nativeElement.contentDocument.createTextNode(cssString));

    this.iframe.nativeElement.contentDocument.head.appendChild(styleElem);

    this.classesEvent.emit(
      new Set<string>(
      Array.from(this.iframe.nativeElement.contentDocument.querySelectorAll("*") as Array<HTMLElement>)
      .map((element: HTMLElement) => element.getAttribute('class') || '')
      .filter((s: string) => s !== ''))
      );
  }

}
