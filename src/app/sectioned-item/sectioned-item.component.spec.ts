import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionedItemComponent } from './sectioned-item.component';

describe('SectionedItemComponent', () => {
  let component: SectionedItemComponent;
  let fixture: ComponentFixture<SectionedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionedItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
