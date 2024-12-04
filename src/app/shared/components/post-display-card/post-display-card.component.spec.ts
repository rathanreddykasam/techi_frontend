import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDisplayCardComponent } from './post-display-card.component';

describe('PostDisplayCardComponent', () => {
  let component: PostDisplayCardComponent;
  let fixture: ComponentFixture<PostDisplayCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostDisplayCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostDisplayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
