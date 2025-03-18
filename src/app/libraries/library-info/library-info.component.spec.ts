import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryInfoComponent } from './library-info.component';

describe('LibraryInfoComponent', () => {
  let component: LibraryInfoComponent;
  let fixture: ComponentFixture<LibraryInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
