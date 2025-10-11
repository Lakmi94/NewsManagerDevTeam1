import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { Article } from '../interfaces/article';

@Pipe({
  name: 'filterArticles',
  pure: false, // so it updates as the user types
  standalone: true,
})
@Injectable()
export class FilterArticlesPipe implements PipeTransform {
  transform(articles: Article[] | null | undefined, term: string): Article[] {
    if (!articles) return [];
    if (!term || term.trim() === '') return articles;

    const lowerTerm = term.toLowerCase();

    return articles.filter((article) => this.matches(article, lowerTerm));
  }

  private matches(article: Article, term: string): boolean {
    return ['title', 'subtitle', 'body', 'category', 'abstract'].some((key) => {
      const value = article[key as keyof Article];
      return value?.toString().toLowerCase().includes(term);
    });
  }
}
