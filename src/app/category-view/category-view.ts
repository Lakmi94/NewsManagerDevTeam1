import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-view',
  imports: [],
  templateUrl: './category-view.html',
  styleUrl: './category-view.css',
})
export class CategoryView implements OnInit {
  category: string = 'all';
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
     this.route.paramMap.subscribe((params) => {
      const categoryId = params.get('id');
      console.log('Category ID:', categoryId);
      this.category = categoryId ? categoryId : 'all';
    });
  }
}
