import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { map, switchMap, startWith, combineLatest, BehaviorSubject } from 'rxjs';
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

	constructor() {
		this.newsService.setAnonymousApiKey();
		// this.category$.subscribe(() => {
		//   this.searchTerm = '';
		// });
	}

	private category$ = this.route.paramMap.pipe(
		map((params) => params.get('id')?.toLowerCase() ?? 'all'),
		startWith('all')
	);

	private reload$ = new BehaviorSubject<void>(undefined);

	news$: Observable<Article[]> = combineLatest([
		this.category$,
		this.newsService.getArticles().pipe(startWith([] as Article[])),
	]).pipe(
		map(([category, articles]) => {
			const filtered =
				category === 'all'
					? articles
					: articles.filter((a) => a.category?.toLowerCase() === category);

			return filtered;
		})
	);

	delete_news(article: Article) {
		if (window.confirm("Do you really want to delete this article?")) {
			const scrollY = window.scrollY; // 👈 aktuelle Position merken
			this.newsService.deleteArticle(article).subscribe({
				complete: () => {
					this.reload$.next();
					setTimeout(() => window.scrollTo({ top: scrollY }), 0);
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