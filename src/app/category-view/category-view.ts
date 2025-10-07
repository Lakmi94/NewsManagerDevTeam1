import { Component, OnInit, ElementRef} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-category-view',
  imports: [CommonModule],
  templateUrl: './category-view.html',
  styleUrl: './category-view.css',
})
export class CategoryView implements OnInit {
  cards = [
    { id: 1, title: 'Card 1', src:'assets/images/placeholder_image.jpg', text: 'This is a long example text that should demonstrate how the more button only appears when the text exceeds three lines in the card layout and is visually truncated by CSS line clamping.', updated: 'Last updated 5 mins ago'  },
    { id: 2, title: 'Card 2', src:'assets/images/placeholder_image2.jpg', text: 'This is the second card.', updated: 'Last updated 5 mins ago' },
    { id: 3, title: 'Card 3', src:'assets/images/placeholder_image3.jpg', text: 'This is the third card.', updated: 'Last updated 10 mins ago' },
    { id: 4, title: 'Card 4', src:'assets/images/placeholder_image2.jpg', text: 'This is the fourth card.', updated: 'Last updated 15 mins ago' },
    { id: 5, title: 'Card 5', src:'assets/images/placeholder_image3.jpg', text: 'This is the fifth card.', updated: 'Last updated 20 mins ago' }
  ];

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
