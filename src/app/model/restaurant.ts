export class Restaurant {
  id: string;
  name: string;
  street1: string;
  city: string;
  zip: string;
  state_code: string;
  website: string;
  phone: string;
  rating: number;
  image: string;
  geo: {
    lat: number,
    lng: number
  };
}
