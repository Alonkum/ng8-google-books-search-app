import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Book } from 'src/app/models/book.model';
// import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { BehaviorSubject } from 'rxjs';

import { join as _join} from 'lodash';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent {

  readonly MAX_SUBTITLE_LEN: number = 90;
  readonly MAX_AUTHORS_LEN: number  = 90;
  readonly MAX_DESC_LEN: number     = 60; // maxium allowed number of caharacters to be shown in the description (if exists)

  @Input() books: Book[];
  @Input() totalBooks: number = 0;
  @Input() chunkLoading: boolean;
  @Input() noMoreData: boolean;
  // @Output() scrollEnd = new EventEmitter<number>();
  @Output() pageChanged = new EventEmitter<number>();
  page = 0;
  size = 4;
  displayedBooks = {};

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // @ViewChild(CdkVirtualScrollViewport, {static: false})
  // viewport: CdkVirtualScrollViewport;

  constructor() {}

  ngOnInit() {
    this.getData({pageIndex: this.page, pageSize: this.size});
  }

  getData(obj) {
    let index=0,
        startingIndex=obj.pageIndex * obj.pageSize,
        endingIndex=startingIndex + obj.pageSize;

    this.displayedBooks = this.books.filter(() => {
      index++;
      return (index > startingIndex && index <= endingIndex) ? true : false;
    });
  }

  ngOnChanges(changes){
    // if (this.books && this.books.length > 0){
       
    //    this.dataSource.data = this.books;

    // }
  }

  // scrollToIndex(index: number) {
  //   this.viewport.scrollToIndex(index);
  // }

  // onIndexChanged(event, i) {

  //   if (this.noMoreData) {
  //     return;
  //   }

  //   const end = this.viewport.getRenderedRange().end;
  //   const total = this.viewport.getDataLength();
  //   if (total !== 0 && end === total) {
  //     this.scrollEnd.emit(i);
  //   }
  // }

  trackByIndex(i: number) {
    return i;
  }

  // Some concated display information to be shown. New properties can be easily added.
  getInfos(book: Book): string {
    const authors =  book.authors.length <= this.MAX_AUTHORS_LEN ? book.authors : book.authors.slice(0, this.MAX_DESC_LEN) + '... ';
    return [
      authors,
      book.publishedDate
    ]
    .filter(v => v !== '')
    .join(' - ');
  }
}
