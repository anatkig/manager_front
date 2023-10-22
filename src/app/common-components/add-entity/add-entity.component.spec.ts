import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntityComponent } from './add-entity.component';

describe('AddEntityComponent', () => {
  let component: AddEntityComponent;
  let fixture: ComponentFixture<AddEntityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEntityComponent],
    });
    fixture = TestBed.createComponent(AddEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
