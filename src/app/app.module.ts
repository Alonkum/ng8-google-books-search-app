import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { BookListComponent } from './components/book-list/book-list.component';
import { ThumbImgComponent } from './components/thumb-img/thumb-img.component';

import { ScrollingModule } from '@angular/cdk/scrolling';

import { AppConfigService } from './services/app-config/app-config.service';
import { BookComponent } from './components/book/book.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { MaterialModule } from './material/material.module';
import { FavoritesPageComponent } from './components/favorites-page/favorites-page.component';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { SharedService } from './auth/shared.service';
import { BookDialogComponent } from './components/book-dialog/book-dialog.component';

export function initializeApp(appConfig: AppConfigService) {
  return () => appConfig.load();
}

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    ThumbImgComponent,
    BookComponent,
    HomePageComponent,
    SearchPageComponent,
    FavoritesPageComponent,
    BookDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ScrollingModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
      AppConfigService,
      { 
        provide: APP_INITIALIZER,
        useFactory: initializeApp,
        deps: [AppConfigService], multi: true 
      },
      AuthGuard,
      AuthService,
      SharedService
  ],
  entryComponents: [BookDialogComponent],

  bootstrap: [AppComponent]
})
export class AppModule { }
