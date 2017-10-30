import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Place} from "../../models/place.interface";
import {PlacesService} from "../../providers/places/places.service";

/**
 * Generated class for the PlacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {

  place: Place;
  index: number;

  constructor(
    private placesSrv: PlacesService,
    private viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.place = this.navParams.get('place');
    this.index = this.navParams.get('index');
  }

  onLeave() {
    this.viewCtrl.dismiss();
  }

  onDelete() {
    this.placesSrv.deletePlace(this.index);
    this.onLeave();
  }

}
