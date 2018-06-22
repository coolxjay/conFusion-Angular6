
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVideoComponent } from './show-video.component';

describe('ShowVideoComponent', () => {
  let component: ShowVideoComponent;
  let fixture: ComponentFixture<ShowVideoComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowVideoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
