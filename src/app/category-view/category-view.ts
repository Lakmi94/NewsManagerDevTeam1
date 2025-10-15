import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { map, startWith, combineLatest, BehaviorSubject } from 'rxjs';
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
  public loginService = inject(LoginService);

  searchTerm: string = '';

  private articlesSubject = new BehaviorSubject<Article[]>([]);
  private articles$ = this.articlesSubject.asObservable();

  private category$ = this.route.paramMap.pipe(
    map((params) => params.get('id')?.toLowerCase() ?? 'all'),
    startWith('all')
  );

  news$: Observable<Article[]> = combineLatest([this.category$, this.articles$]).pipe(
    map(([category, articles]) => {
      return category === 'all'
        ? articles
        : articles.filter((a) => a.category?.toLowerCase() === category);
    })
  );

  constructor() {
    this.newsService.setAnonymousApiKey();

    this.newsService.getArticles().subscribe({
      next: (articles) => this.articlesSubject.next(articles),
      error: (err) => console.error('Failed to load articles', err),
    });
  }

  delete_news(article: Article) {
    if (window.confirm(`Are you sure you want to delete "${article.title}"?`)) {
      const scrollY = window.scrollY;

      this.newsService.deleteArticle(article).subscribe({
        next: () => {
          const updated = this.articlesSubject.getValue().filter((a) => a.id !== article.id);
          this.articlesSubject.next(updated);
          setTimeout(() => window.scrollTo({ top: scrollY }), 0);
          window.alert(`The article "${article.title}" was successfully deleted!`);
        },
        error: (err) => console.error('Delete failed', err),
      });
    }
  }

  getTimeAgo(dateString: string | Date): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const sec = Math.floor(diffMs / 1000);
    const min = Math.floor(sec / 60);
    const hrs = Math.floor(min / 60);
    const days = Math.floor(hrs / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hrs > 0) return `${hrs} hour${hrs > 1 ? 's' : ''} ago`;
    if (min > 0) return `${min} minute${min > 1 ? 's' : ''} ago`;
    return 'just now';
  }
}
