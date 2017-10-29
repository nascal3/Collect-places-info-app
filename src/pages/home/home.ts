import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Place} from "../../models/place.interface";
import {PlacesService} from "../../providers/places/places";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  places: Place[] = [];

  constructor(
    private placesSrv: PlacesService,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.places = this.placesSrv.loadPlaces();
  }

  navPush() {
    this.navCtrl.push("AddPlacePage");
  }

}
