import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSerialnoComponent } from './add-serialno.component';

describe('AddSerialnoComponent', () => {
  let component: AddSerialnoComponent;
  let fixture: ComponentFixture<AddSerialnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSerialnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSerialnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
