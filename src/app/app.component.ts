import { Component, OnInit, OnDestroy} from '@angular/core';
import { BooksApiService } from './services/books-api/books-api.service';
import { BehaviorSubject, empty, Subscription } from 'rxjs';
import { mergeMap, throttleTime, tap} from 'rxjs/operators';
import { InputData, InfoType, FormResult } from './services/books-api/data-structures';
import { Book } from './models/book.model';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { SharedService } from './auth/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  user: string;
  constructor(
    private _sharedService: SharedService,
    private localStorageService: LocalStorageService 
    ) {
        this.user = this.localStorageService.get('currentUser');
          _sharedService.changeEmitted$.subscribe(value => this.user = value);
      }



 
}
