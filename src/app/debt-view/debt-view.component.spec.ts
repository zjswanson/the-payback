import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtViewComponent } from './debt-view.component';

describe('DebtViewComponent', () => {
  let component: DebtViewComponent;
  let fixture: ComponentFixture<DebtViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebtViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
