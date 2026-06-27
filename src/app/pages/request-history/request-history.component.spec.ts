import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestHistoryComponent } from './request-history.component';

describe('RequestHistoryComponent', () => {
  let component: RequestHistoryComponent;
  let fixture: ComponentFixture<RequestHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestHistoryComponent]
    });
    fixture = TestBed.createComponent(RequestHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
