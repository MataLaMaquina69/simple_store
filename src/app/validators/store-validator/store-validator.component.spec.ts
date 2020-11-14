import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreValidatorComponent } from './store-validator.component';

describe('StoreValidatorComponent', () => {
  let component: StoreValidatorComponent;
  let fixture: ComponentFixture<StoreValidatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreValidatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
