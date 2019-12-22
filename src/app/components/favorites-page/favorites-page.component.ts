import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss']
})
export class FavoritesPageComponent implements OnInit {

  favoriteBooks: any;
  constructor(private localStorageService: LocalStorageService) {
    this.favoriteBooks = JSON.parse(this.localStorageService.get('favorites'));
   }

  ngOnInit() {
  }

  removeFromFavorites(index){
    this.favoriteBooks.splice(index, 1);
    this.localStorageService.store('favorites', JSON.stringify(this.favoriteBooks));
  }

}
