import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { map, BehaviorSubject, switchMap, startWith, combineLatest } from 'rxjs';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { News } from '../services/news';
import { Article } from '../interfaces/article';
import { SafeHtmlPipe } from '../pipes/safe-html-pipe';
import { LoginService } from '../services/login-service';

@Component({
  selector: 'app-category-view',
  standalone: true,
  imports: [CommonModule, RouterLink, SafeHtmlPipe, FormsModule],
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
  }

  loggedIn$ = this.loginService.user$.pipe(map((user) => !!user));

  private category$ = this.route.paramMap.pipe(
    map((params) => (params.get('id')?.toLowerCase() ?? 'all')),
    startWith('all')
  );

  private reload$ = new BehaviorSubject<void>(undefined);

  news$: Observable<Article[]> = combineLatest([
    this.category$,
    this.reload$,
  ]).pipe(
    switchMap(([category]) =>
      this.newsService.getArticles().pipe(
        startWith([] as Article[]),
        map(articles =>
          category === 'all'
            ? articles
            : articles.filter(a => a.category?.toLowerCase() === category)
        )
      )
    )
  );

  toDelete?: Article;
  deletedIds$ = new BehaviorSubject<Set<number>>(new Set());

  openDelete(card: Article) {
    this.toDelete = card;
  }

  delete(id: number | string | undefined) {
    if (id == null) return;

    const numericId = typeof id === 'string' ? Number(id) : id;

    this.newsService.deleteArticle(numericId).subscribe({
      next: () => {
        const nextSet = new Set(this.deletedIds$.value);
        nextSet.add(numericId);
        this.deletedIds$.next(nextSet);
        this.reload$.next();
        console.log("works");
      },
      error: (err) => console.error('Delete failed', err),
    });
  }
}
