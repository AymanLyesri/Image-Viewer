import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SauceComponent } from './sauce.component';

describe('SauceComponent', () => {
  let component: SauceComponent;
  let fixture: ComponentFixture<SauceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SauceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SauceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
