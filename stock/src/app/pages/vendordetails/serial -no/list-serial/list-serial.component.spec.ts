import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSerialComponent } from './list-serial.component';

describe('ListSerialComponent', () => {
  let component: ListSerialComponent;
  let fixture: ComponentFixture<ListSerialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSerialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSerialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
