import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSerialComponent } from './add-serial.component';

describe('AddSerialComponent', () => {
  let component: AddSerialComponent;
  let fixture: ComponentFixture<AddSerialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSerialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSerialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
