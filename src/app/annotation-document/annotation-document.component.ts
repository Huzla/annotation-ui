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
      if (className) {
        this.addClassToIframe(className, selectedClass);
      }

    }));

    this.subscriptions.push(this.classDelete.subscribe((className: string) => {
      this.removeClassFromIframe(className, selectedClass);
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private removeClassFromIframe(target: string, className: string): void {
    this.iframeQuerySelectorAll(target)
        .forEach((element: Element) => {
          element.classList.remove(className);
        });
  }

  // Note that target can consist of multiple classes.
  private addClassToIframe(target: string, newClassName: string): void {
    this.iframeQuerySelectorAll(target)
        .forEach((element: Element) => {
          element.classList.add(newClassName);
        });
  }

  private stringToClassSelector(className: string) {
    return '.' + className.replace(/ /gi, '.');
  }

  private scrollTo(target: string) {
    const elem: Element | null = this.iframeQuerySelector(target);

    if (elem)
      elem.scrollIntoView(true);
  }

  private iframeQuerySelector(selectorString: string): Element | null {
    try {
      return this.iframe.nativeElement.contentDocument.querySelector(this.stringToClassSelector(selectorString));
    } catch (_) {
      return null;
    }
  }

  private iframeQuerySelectorAll(selectorString: string): Element[] {
    try {
      return this.iframe.nativeElement.contentDocument.querySelectorAll(this.stringToClassSelector(selectorString));
    } catch (_) {
      return [];
    }
  }

  outputClasses(): void {
    const cssString = `
      .focused-item {
          border: 1rem solid #d95f02;
          background-color: #d95f029F;
          border-radius: 0.2rem;
      }

      .selected-item {
        border: 1rem solid #1b9e77;
        border-radius: 0.2rem;
        background-color: #1b9e77BF;
      }
    `;

    const styleElem = this.iframe.nativeElement.contentDocument.createElement('style');
    styleElem.appendChild(this.iframe.nativeElement.contentDocument.createTextNode(cssString));

    this.iframe.nativeElement.contentDocument.head.appendChild(styleElem);

    this.classesEvent.emit(
      new Set<string>(
      Array.from(this.iframe.nativeElement.contentDocument.querySelectorAll("*") as Array<HTMLElement>)
      .map((element: HTMLElement) => element.getAttribute('class')?.trim() || '')
      .filter((s: string) => s !== ''))
      );
  }

}
