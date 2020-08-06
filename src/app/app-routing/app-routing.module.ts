import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RestaurantDetailsComponent} from '../components/restaurant-details/restaurant-details.component';
import {IndexPageComponent} from '../components/index-page/index-page.component';
import {RestaurantsListComponent} from '../components/restaurants-list/restaurants-list.component';
import {ReviewPageComponent} from '../components/review-page/review-page.component';

const routes: Routes = [
  {path: '', component: IndexPageComponent },
  {path: 'restaurants-list', component: RestaurantsListComponent},
  {path: 'restaurant-details/:id', component: RestaurantDetailsComponent},
  {path: 'restaurant-details', component: RestaurantDetailsComponent},
  {path: 'restaurant-review', component: ReviewPageComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})

export class AppRoutingModule {
}
