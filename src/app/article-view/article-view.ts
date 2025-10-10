import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { News } from '../services/news';
import { Article } from '../interfaces/article';
import { SafeHtmlPipe } from '../pipes/safe-html-pipe';
import * as _ from 'lodash';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-article-view',
  standalone: true,
  imports: [RouterModule, CommonModule, SafeHtmlPipe, RouterLink],
  templateUrl: './article-view.html',
  styleUrls: ['./article-view.css'],
})
export class ArticleView {
  private route = inject(ActivatedRoute);
  private newsService = inject(News);

  article$: Observable<Article> = this.route.paramMap.pipe(
    switchMap(params => {
      const id = params.get('id');
      const article = this.newsService.getArticle(id);
      console.log('article from component',article);
      return article;

    })
  ); 

  constructor() {
    this.article$.subscribe(article => {
      console.log('article from subscription', article);
    });
  }
}
