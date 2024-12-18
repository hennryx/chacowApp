import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchPaperComponent } from './research-paper.component';

describe('ResearchPaperComponent', () => {
  let component: ResearchPaperComponent;
  let fixture: ComponentFixture<ResearchPaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResearchPaperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResearchPaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
