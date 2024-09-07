import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpassowrdComponent } from './forgotpassowrd.component';

describe('ForgotpassowrdComponent', () => {
  let component: ForgotpassowrdComponent;
  let fixture: ComponentFixture<ForgotpassowrdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotpassowrdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForgotpassowrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
