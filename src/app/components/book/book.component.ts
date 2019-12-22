import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { MatDialog } from '@angular/material/dialog';
import { BookDialogComponent, DialogData } from '../book-dialog/book-dialog.component';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  @Input() favorite: boolean = false;;
  @Input() book: Book;
  @Output() removeTrigger = new EventEmitter<any>()
  readonly MAX_SUBTITLE_LEN: number = 90;
  readonly MAX_AUTHORS_LEN: number  = 90;
  readonly MAX_DESC_LEN: number     = 60; // maxium allowed number of caharacters to be shown in the description (if exists)


  constructor(public dialog: MatDialog,
    private localStorageService: LocalStorageService) { }

  ngOnInit() {
  }

  getInfos(book: Book): string {
    const authors =  book.authors.length <= this.MAX_AUTHORS_LEN ? book.authors : book.authors.slice(0, this.MAX_DESC_LEN) + '... ';
    return [
      authors,
      book.publishedDate
    ]
    .filter(v => v !== '')
    .join(' - ');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BookDialogComponent, {
      width: '70vw',
      data: {book: this.book, favorite: false}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.favorite){     
        let favorites = JSON.parse(this.localStorageService.get('favorites'));
        favorites ? favorites.push(result.book) : favorites = [result.book];
        this.localStorageService.store('favorites', JSON.stringify(favorites));      
      }
      
    });
  }

  remove(){
    this.removeTrigger.emit()
  }

}
