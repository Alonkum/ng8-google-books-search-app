import { Component, OnInit, OnDestroy} from '@angular/core';
import { BooksApiService } from '../../services/books-api/books-api.service';
import { BehaviorSubject, empty, Subscription } from 'rxjs';
import { mergeMap, throttleTime, tap} from 'rxjs/operators';
import { InputData, InfoType, FormResult } from '../../services/books-api/data-structures';
import { Book } from './../../models/book.model';
import { LocalStorageService } from './../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  searchInputData: InputData = new InputData();
  noMoreData: boolean = false;
  formSubmitted: boolean = false;
  chunkLoading: boolean = false;
  offsetState$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  allBooks: Book[] = [];
  subscription: Subscription;
  totalBooks: number = 0
  formState: FormResult = {};
  isNewSearch: boolean = false;

  private clearFormState() {
    this.formState = {
      type: InfoType.NONE,
      message: ''
    };
  }

  private setFormState(newState: FormResult) {
    this.formState = {...this.formState, ...newState };
  }

  constructor(private booksService: BooksApiService,
              private storageService: LocalStorageService ) {
    
  }

  ngOnInit() {
    this.subscription = this.offsetState$.pipe(
      throttleTime(500),
      mergeMap(offset => {
        if (offset === null){
          return empty();
        }
        return this.booksService.list(offset, this.searchInputData.title);
      })
    )
    .subscribe(
      data => {
        this.noMoreData = !data.items.length;
        if (this.noMoreData) {
          if (this.formSubmitted) {
            // if this was form search, and not a "pagination"
            this.setFormState({type: InfoType.ERROR, message: 'No results were found for your search.'});
          }
        }
        else {
        
          this.totalBooks = data.totalItems;
          this.allBooks = data.items;
        }
        this.stopLoading();
      },
      error => this.handleError(error)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private handleError(error: any) {
    console.log(error.message);
    let message = error.message;
    if (error.status === 0) {
      message = 'Error 503 - Service Unavailable. Please check your connection.'
    }

    this.setFormState({
      type: InfoType.ERROR,
      message
    });

    this.stopLoading();
        
  }

  private stopLoading(): void {
    this.chunkLoading = false;
    this.formSubmitted = false;
  }

  public paginatedSearch(page) {
    this.isNewSearch = false;
    this.chunkLoading = true;
    let sign = page.previousPageIndex >= page.pageIndex ? -1 : 1;
    let startIndex = page.previousPageIndex*page.pageSize+sign*(page.pageSize);
    this.offsetState$.next(startIndex);
  }

  isInvalid() {
    return Object
      .entries(this.searchInputData)
      .every(([k,v]) => v.trim() === '');
  }

  private newSerach() {
    this.clearFormState();
    this.noMoreData = false;
    this.formSubmitted = true;
    this.allBooks = [];
    // storing last expression to the local storage
    this.storageService.store('lastSearch', this.searchInputData.toString());
    this.offsetState$.next(0);
  }

  public formSearch(event) {
    // only generate the new query string, if new search was performed.
    if (this.booksService.regenerateQuery(this.searchInputData)) {
      // new serach, so reinit variables
      this.isNewSearch = true;
      this.newSerach();
      return;
    }

    this.setFormState({
      type: InfoType.ERROR, 
      message: 'Can not build query for searching. Please refill the input fields.'
    });
    
  }
}
