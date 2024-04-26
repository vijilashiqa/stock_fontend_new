import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOwnComponent } from './edit-own.component';

describe('EditOwnComponent', () => {
  let component: EditOwnComponent;
  let fixture: ComponentFixture<EditOwnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOwnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditOwnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
