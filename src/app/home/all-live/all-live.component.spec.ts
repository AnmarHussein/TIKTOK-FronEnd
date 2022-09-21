import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLiveComponent } from './all-live.component';

describe('AllLiveComponent', () => {
  let component: AllLiveComponent;
  let fixture: ComponentFixture<AllLiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllLiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
