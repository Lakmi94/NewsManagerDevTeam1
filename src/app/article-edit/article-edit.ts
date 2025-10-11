import { Component, inject, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Article } from '../interfaces/article';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { News } from '../services/news';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-article-edit',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './article-edit.html',
  styleUrls: ['./article-edit.css'],
})
export class ArticleEdit {
  article: Article = {
    id: 0,
    id_user: 0,
    abstract: '',
    subtitle: '',
    update_date: '',
    category: '',
    title: '',
    thumbnail_image: '',
    thumbnail_media_type: '',
    body: '',
  };

  private newsService = inject(News);
  private route = inject(ActivatedRoute);

  id = this.route.snapshot.paramMap.get("id");

  constructor() {
    this.newsService.getArticle(this.id).subscribe((article) => {
      this.article = { ...article };
    });
  }

  saveArticle(): void {
    console.log('Saving:', this.article);
    this.newsService.updateArticle(this.article).subscribe((event) => {
      console.log('Updated:', event);
    });
  }
}