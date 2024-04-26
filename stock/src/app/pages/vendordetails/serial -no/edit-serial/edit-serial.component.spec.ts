import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSerialComponent } from './edit-serial.component';

describe('EditSerialComponent', () => {
  let component: EditSerialComponent;
  let fixture: ComponentFixture<EditSerialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSerialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSerialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
