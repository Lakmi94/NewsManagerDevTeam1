import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Article } from '../interfaces/article';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { News } from '../services/news';
import * as _ from 'lodash'; 


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

  imageError: string | null = null;
  isImageSaved: boolean = false;
  cardImageBase64: string | null = null;
  
  private newsService = inject(News);
  private route = inject(ActivatedRoute);

  id = this.route.snapshot.paramMap.get("id");

  constructor() {
    if (this.id !=null) {
      this.newsService.getArticle(this.id).subscribe((article) => {
        this.article = { ...article };
      });
    }
  }

  saveArticle(): void {
    console.log('Saving:', this.article);
    this.newsService.updateArticle(this.article).subscribe((event) => {
      console.log('Updated:', event);
    });
  }
  
  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const MAX_SIZE = 20971520;
      const ALLOWED_TYPES = ['image/png', 'image/jpeg'];

      if (fileInput.target.files[0].size > MAX_SIZE) {
        this.imageError =
          'Maximum size allowed is ' + MAX_SIZE / 1000 + 'Mb';
        return false;
      }
      if (!_.includes(ALLOWED_TYPES, fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgBase64Path = e.target.result;
          this.cardImageBase64 = imgBase64Path;
          this.isImageSaved = true;

          this.article.image_media_type = fileInput.target.files[0].type;
          const head = fileInput.target.files[0].type.length + 13;
          this.article.image_data = e.target.result.substring(head, e.target.result.length);

        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
    return true;
  }

}