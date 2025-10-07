import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { News } from '../services/news';  
@Component({
  selector: 'app-category-view',
  imports: [],
  templateUrl: './category-view.html',
  styleUrl: './category-view.css',
})
export class CategoryView implements OnInit {
  category: string = 'all';
  constructor(private route: ActivatedRoute, private newsService: News) {
    this.newsService.setAnonymousApiKey();
  }
  ngOnInit() {
     this.route.paramMap.subscribe((params) => {
      const categoryId = params.get('id');
      console.log('Category ID:', categoryId);
      this.category = categoryId ? categoryId : 'all';
    });
    this.newsService.getArticles().subscribe((articles) => {
      console.log(articles);
    });
  }
}
