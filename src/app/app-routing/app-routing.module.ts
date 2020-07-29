import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RestaurantDetailsComponent} from '../components/restaurant-details/restaurant-details.component';
import {IndexPageComponent} from '../components/index-page/index-page.component';
import {RestaurantsListComponent} from '../components/restaurants-list/restaurants-list.component';

const routes: Routes = [
  {path: '', component: IndexPageComponent },
  {path: 'restaurants-list', component: RestaurantsListComponent},
  {path: 'restaurant-details/:id', component: RestaurantDetailsComponent},
  {path: 'restaurant-details', component: RestaurantDetailsComponent},
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
