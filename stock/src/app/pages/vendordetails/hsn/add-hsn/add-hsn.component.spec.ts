import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHsnComponent } from './add-hsn.component';

describe('AddHsnComponent', () => {
  let component: AddHsnComponent;
  let fixture: ComponentFixture<AddHsnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHsnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHsnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
