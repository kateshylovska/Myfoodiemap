import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RestaurantDetailsComponent } from './components/restaurant-details/restaurant-details.component';
import { IndexPageComponent } from './components/index-page/index-page.component';
import { RestaurantsListComponent } from './components/restaurants-list/restaurants-list.component';
import { HeaderComponent } from './components/shared/header/header.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import { ReviewPageComponent } from './components/review-page/review-page.component';
import { DisqusModule } from 'ngx-disqus';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantDetailsComponent,
    IndexPageComponent,
    RestaurantsListComponent,
    HeaderComponent,
    ReviewPageComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    MatIconModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatMenuModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBFhoeUwsizsKcA6IXO0DL3NuO-6zEqibg'
    }),
    ReactiveFormsModule,
    DisqusModule.forRoot('disqus_restaurantplace')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
