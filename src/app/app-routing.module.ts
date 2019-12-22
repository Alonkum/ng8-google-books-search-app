import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FavoritesPageComponent } from './components/favorites-page/favorites-page.component';
import { AuthGuard } from './auth/auth-guard.service';


const routes: Routes = [
  { path: 'search', component: SearchPageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: HomePageComponent},
  { path: 'favorites', component: FavoritesPageComponent, canActivate: [AuthGuard] },
  { path: '**', component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  })
export class AppRoutingModule { }
