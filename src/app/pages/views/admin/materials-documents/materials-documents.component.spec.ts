import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialsDocumentsComponent } from './materials-documents.component';

describe('MaterialsDocumentsComponent', () => {
  let component: MaterialsDocumentsComponent;
  let fixture: ComponentFixture<MaterialsDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialsDocumentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialsDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
