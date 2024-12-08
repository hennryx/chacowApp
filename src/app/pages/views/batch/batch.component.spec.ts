import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchComponent } from './batch.component';

describe('BatchComponent', () => {
  let component: BatchComponent;
  let fixture: ComponentFixture<BatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
