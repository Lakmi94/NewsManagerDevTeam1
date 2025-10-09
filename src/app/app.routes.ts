import { Routes } from '@angular/router';
import { CategoryView } from './category-view/category-view';
import { ArticleView } from './article-view/article-view';
import { ArticleEdit } from './article-edit/article-edit';

export const routes: Routes = [
  { path: '', redirectTo: '/category/all', pathMatch: 'full' },
  { path: 'category/:id', component: CategoryView },
  { path: 'article/:id', component: ArticleView },
  { path: 'edit/:id', component: ArticleEdit},
];
