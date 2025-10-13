import { Component, ElementRef, QueryList, ViewChildren, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { map, BehaviorSubject, startWith, combineLatest, debounceTime } from 'rxjs';
import { Observable, take } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { News } from '../services/news';
import { Article } from '../interfaces/article';
import { SafeHtmlPipe } from '../pipes/safe-html-pipe';
import { LoginService } from '../services/login-service';

@Component({
	selector: 'app-category-view',
	standalone: true,
	imports: [CommonModule, RouterLink, FormsModule, SafeHtmlPipe],
	templateUrl: './category-view.html',
	styleUrls: ['./category-view.css'],
})

export class CategoryView {
	private route = inject(ActivatedRoute);
	private newsService = inject(News);
	public loginService = inject(LoginService);
	searchTerm: string = '';
	search$ = new BehaviorSubject<string>('');


	constructor() {
		this.newsService.setAnonymousApiKey();
		this.category$.subscribe(() => {
			this.searchTerm = '';
			// this.search$.next('');
		});
	}

	onSearchChange(value: string) {
		this.search$.next(value);
		console.log("works_search")
	}

	private category$ = this.route.paramMap.pipe(
		map((params) => params.get('id')?.toLowerCase() ?? 'all'),
		startWith('all')
	);

	private reload$ = new BehaviorSubject<void>(undefined);

	news$: Observable<Article[]> = combineLatest([
		this.category$,
		this.newsService.getArticles().pipe(startWith([] as Article[])),
		this.search$.pipe(startWith(''), debounceTime(20), map(s => s.trim().toLowerCase())),
		this.reload$.pipe(startWith(undefined)) 
	]).pipe(
		map(([category, articles, q]) => {
			let list = category === 'all'
				? articles
				: articles.filter(a => a.category?.toLowerCase() === category);

			if (!q) return list;

			return list.filter(a => {
				const t = (a.title ?? '').toLowerCase();
				const s = (a.subtitle ?? '').toLowerCase();
				const ab = (a.abstract ?? '').toLowerCase();
				return t.includes(q) || s.includes(q) || ab.includes(q);
			});
		})
	);

	delete_news(article: Article) {
		console.log('Deleting:', article);
		this.newsService.deleteArticle(article).subscribe({
			next: () => {
				console.log('Deleted: ', article);
				this.reload$.next();
			},
			error: (err) => console.error('Delete failed', err),
		});
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
