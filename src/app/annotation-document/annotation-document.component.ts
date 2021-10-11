import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


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

  @Output()
  classesEvent = new EventEmitter<Set<string>>();

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this._safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.documentUrl);

    setTimeout(() => {
      console.log(this.iframe);
      
      this.classesEvent.emit(
        new Set<string>(
        Array.from(this.iframe.nativeElement.contentDocument.querySelectorAll("*") as Array<HTMLElement>)
        .map((element: HTMLElement) => element.className))
        );
    }, 100);
  }

}
