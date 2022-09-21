import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrfileUsersComponent } from './prfile-users.component';

describe('PrfileUsersComponent', () => {
  let component: PrfileUsersComponent;
  let fixture: ComponentFixture<PrfileUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrfileUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrfileUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
