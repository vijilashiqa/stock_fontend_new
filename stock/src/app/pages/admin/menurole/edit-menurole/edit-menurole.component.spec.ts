import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMenuroleComponent } from './edit-menurole.component';

describe('EditMenuroleComponent', () => {
  let component: EditMenuroleComponent;
  let fixture: ComponentFixture<EditMenuroleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMenuroleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMenuroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
