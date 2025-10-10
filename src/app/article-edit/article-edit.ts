import { Component, inject, ViewChild} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Article } from '../interfaces/article';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { News } from '../services/news';
import { Observable } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';




@Component({
  selector: 'app-article-edit',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './article-edit.html',
  styleUrl: './article-edit.css'
})
export class ArticleEdit {
  article: any = {
    id: 1,
    id_user: 1,
    abstract:"",
    subtitle:"",
    update_date:"",
    category:"",
    title:"",
    thumbnail_image: "",
    thumbnail_media_type:"",
    body:"",
  }
  private newsService = inject(News);
  private route = inject(ActivatedRoute);

  article$: Observable<Article> = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        let article = this.newsService.getArticle(id);
        article.subscribe(event => this.article = event);
        return article;
      })
    );
  
  @ViewChild('articleContent') articleContent: any;

  saveArticle(): void {
    console.log(this.article);
    this.newsService.updateArticle({...this.article}).subscribe(event => {
      console.log(event);
    });
    this.newsService.getArticle(this.article.id).subscribe(event => {
      console.log(event);
    });
  }

      //this.email_service.removeList();
  // ngOnInit(): void {
  //   this.route.queryParamMap.subscribe(params => {
  //     let id = params.get('id'); 
  //     let num_id: string = String(id);
  //     let article: Observable<Article> = this.newsService.getArticle(num_id);
  //     article.pipe(take(1)).subscribe(event => this.article = { event });
  //   })
  // }
  
}