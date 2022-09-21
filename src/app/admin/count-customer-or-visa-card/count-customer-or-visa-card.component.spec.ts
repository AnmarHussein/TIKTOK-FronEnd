import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountCustomerOrVisaCardComponent } from './count-customer-or-visa-card.component';

describe('CountCustomerOrVisaCardComponent', () => {
  let component: CountCustomerOrVisaCardComponent;
  let fixture: ComponentFixture<CountCustomerOrVisaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountCustomerOrVisaCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountCustomerOrVisaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
