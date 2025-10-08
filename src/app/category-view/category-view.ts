import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { News } from '../services/news';
import { CommonModule } from '@angular/common';
import { Article } from '../interfaces/article';
import * as _ from 'lodash';
import { SafeHtmlPipe } from '../pipes/safe-html-pipe';
import { LoginService } from '../services/login-service';

@Component({
  selector: 'app-category-view',
   standalone: true,
  imports: [CommonModule, SafeHtmlPipe, RouterLink],
  templateUrl: './category-view.html',
  styleUrl: './category-view.css',
})
export class CategoryView implements OnInit {

  news: Article[] = [];
  loggedIn: boolean = false;
  category: string = 'all';
  constructor(private route: ActivatedRoute, private newsService: News, public loginService: LoginService) {
    this.newsService.setAnonymousApiKey();
  }
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const categoryId = params.get('id');
      console.log('Category ID:', categoryId);
      this.category = categoryId ? categoryId : 'all';
    });
    this.loginService.user$.subscribe((currentUser) => {
      this.loggedIn = !!currentUser;
    });
    this.newsService.getArticles().subscribe((articles) => {
      this.news = articles;
      console.log(this.news);
      
    });
  }
}
