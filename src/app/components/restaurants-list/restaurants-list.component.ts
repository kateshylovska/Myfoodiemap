import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {PeriodicElement} from '../../app.component';
import {RestaurantService} from '../../service/restaurant.service';
import {Restaurant} from '../../model/restaurant';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.css']
})
export class RestaurantsListComponent implements OnInit {
  lat = 47.61022;
  lng = -122.347613;
  public restaurants: any [];
  public restaurantsImages: string[] = [
    'https://kristineskitchenblog.com/wp-content/uploads/2019/06/italian-pasta-salad-700-207.jpg',
    'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/01/a0001909/img/basic/a0001909_main.jpg?20180711132334&q=80&rw=750&rh=536',
    'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2019/1/11/0/KC1912_Bacon-and-Egg-Fried-Rice_s4x3.jpg.rend.hgtvcom.826.620.suffix/1547241481011.jpeg',
    'https://images.getbento.com/accounts/a3e72eb05f5158bbaa07dab02b2d4748/media/images/60195Photo_Apr_25_8_30_36_PM.jpg?fit=max&w=1800&auto=format,compress',
    'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-image.foodandwine.com%2Fsites%2Fdefault%2Ffiles%2F1480696614%2Fseafood-paella-XL-RECIPE0117.jpg',
    'https://www.readersdigest.ca/wp-content/uploads/2015/11/gourmet-burger-scaled.jpg'
  ];
  q: string;
  category: string;
  constructor(
    private restaurantService: RestaurantService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const navigation = router.getCurrentNavigation();
        console.log(navigation);
        this.q = navigation.extras.queryParams && navigation.extras.queryParams.q;
        this.category = navigation.extras.queryParams && navigation.extras.queryParams.category;
      }
    });
  }

  ngOnInit(): void {
    const params = new Map<string, string>();
    this.restaurantService.search(params).subscribe(e => {
      this.restaurants = e.result.map((item, index) => {
        item.image = this.restaurantsImages[index];
        return item;
      });
      console.log(this.q);
      console.log(this.category);
      if (this.q && this.q !== '') {
        this.restaurants = this.restaurants.filter(item => item.name.toLowerCase().indexOf(this.q.toLowerCase()) !== -1);
      }
      if (this.category && this.category !== '' && this.category !== 'all') {
        this.restaurants = this.restaurants.filter(item => item.category.toLowerCase() === this.category.toLowerCase());
      }
    });
  }
}
