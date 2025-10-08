import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleView } from './article-view';

describe('ArticleView', () => {
  let component: ArticleView;
  let fixture: ComponentFixture<ArticleView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
