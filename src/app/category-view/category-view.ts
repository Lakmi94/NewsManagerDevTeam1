import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { map, switchMap, startWith, combineLatest } from 'rxjs';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { News } from '../services/news';
import { Article } from '../interfaces/article';
import { SafeHtmlPipe } from '../pipes/safe-html-pipe';
import { LoginService } from '../services/login-service';
import { FilterArticlesPipe } from '../pipes/filter-text-pipe';
@Component({
  selector: 'app-category-view',
  standalone: true,
  imports: [CommonModule, RouterLink, SafeHtmlPipe, FormsModule, FilterArticlesPipe],
  templateUrl: './category-view.html',
  styleUrls: ['./category-view.css'],
})
export class CategoryView {
  private route = inject(ActivatedRoute);
  private newsService = inject(News);
  private loginService = inject(LoginService);
  searchTerm: string = '';

  constructor() {
    this.newsService.setAnonymousApiKey();
    // this.category$.subscribe(() => {
    //   this.searchTerm = '';
    // });
  }

  loggedIn$ = this.loginService.user$.pipe(map((user) => !!user));

  private category$ = this.route.paramMap.pipe(
    map((params) => params.get('id')?.toLowerCase() ?? 'all'),
    startWith('all')
  );

  news$: Observable<Article[]> = combineLatest([
    this.category$,
    this.newsService.getArticles().pipe(startWith([] as Article[])),
  ]).pipe(
    map(([category, articles]) =>
      category === 'all' ? articles : articles.filter((a) => a.category?.toLowerCase() === category)
    )
  );
}
