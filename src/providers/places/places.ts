import { Injectable } from '@angular/core';
import { Place } from "../../models/place.interface";
import {Location} from "../../models/location.interface";

/*
  Generated class for the PlacesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlacesService {

  private places: Place[] = [];

  constructor() {

  }

  addPlace(title: string, description: string, location: Location, imageUrl: string) {
    const place = new Place(title, description, location, imageUrl);
    this.places.push(place);
  }

  loadPlaces() {
    return this.places.slice();
  }

}
