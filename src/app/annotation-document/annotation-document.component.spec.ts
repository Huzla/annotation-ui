import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationDocumentComponent } from './annotation-document.component';

describe('AnnotationDocumentComponent', () => {
  let component: AnnotationDocumentComponent;
  let fixture: ComponentFixture<AnnotationDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnotationDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotationDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
