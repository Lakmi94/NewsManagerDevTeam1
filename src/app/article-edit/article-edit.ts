import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Article } from '../interfaces/article';

@Component({
  selector: 'app-article-edit',
  imports: [FormsModule],
  templateUrl: './article-edit.html',
  styleUrl: './article-edit.css'
})
export class ArticleEdit {
  article: Article = {
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
  
}
