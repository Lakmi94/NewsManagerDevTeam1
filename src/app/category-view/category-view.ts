import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { map, switchMap, startWith, combineLatest } from 'rxjs';
import { Observable } from 'rxjs';

import { News } from '../services/news';
import { Article } from '../interfaces/article';
import { SafeHtmlPipe } from '../pipes/safe-html-pipe';
import { LoginService } from '../services/login-service';

@Component({
  selector: 'app-category-view',
  standalone: true,
  imports: [CommonModule, RouterLink, SafeHtmlPipe],
  templateUrl: './category-view.html',
  styleUrls: ['./category-view.css'],
})
export class CategoryView {
  private route = inject(ActivatedRoute);
  private newsService = inject(News);
  private loginService = inject(LoginService);

  constructor() {
    this.newsService.setAnonymousApiKey();
  }

  loggedIn$ = this.loginService.user$.pipe(map((user) => !!user));

  private category$ = this.route.paramMap.pipe(
    map((params) => (params.get('id')?.toLowerCase() ?? 'all')),
    startWith('all') // ensures first emission
  );

  news$: Observable<Article[]> = combineLatest([
    this.category$,
    this.newsService.getArticles().pipe(startWith([] as Article[])),
  ]).pipe(
    map(([category, articles]) =>
      category === 'all'
        ? articles
        : articles.filter(
            (a) => a.category?.toLowerCase() === category
          )
    )
  );
}
