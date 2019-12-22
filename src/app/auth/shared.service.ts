import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
@Injectable()
export class SharedService {

  constructor(private localStorageService: LocalStorageService){
    
  }
    // Observable string sources
    private emitChangeSource = new Subject<any>();
    // Observable string streams
    changeEmitted$ = this.emitChangeSource.asObservable();
    // Service message commands
    emitChange(change: any) {
        this.emitChangeSource.next(change);
    }
}