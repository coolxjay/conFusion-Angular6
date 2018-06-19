
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishPageComponent } from './dish-page.component';

describe('DishPageComponent', () => {
  let component: DishPageComponent;
  let fixture: ComponentFixture<DishPageComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DishPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
