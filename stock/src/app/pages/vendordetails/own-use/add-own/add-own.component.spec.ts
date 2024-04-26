import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOwnComponent } from './add-own.component';

describe('AddOwnComponent', () => {
  let component: AddOwnComponent;
  let fixture: ComponentFixture<AddOwnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOwnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOwnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
