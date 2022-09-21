import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoteTypeComponent } from './promote-type.component';

describe('PromoteTypeComponent', () => {
  let component: PromoteTypeComponent;
  let fixture: ComponentFixture<PromoteTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoteTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoteTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
