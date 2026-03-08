import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnConfirmDialog } from './return-confirm-dialog';

describe('ReturnConfirmDialog', () => {
  let component: ReturnConfirmDialog;
  let fixture: ComponentFixture<ReturnConfirmDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnConfirmDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnConfirmDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
