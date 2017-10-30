import { Component, OnInit } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {Place} from "../../models/place.interface";
import {PlacesService} from "../../providers/places/places.service";

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
export class HomePage implements OnInit{

  places: Place[] = [];

  constructor(
    private modalCtrl: ModalController,
    private placesSrv: PlacesService,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
    this.placesSrv.fetchPlaces();
  }

  ionViewWillEnter() {
    this.places = this.placesSrv.loadPlaces();
  }

  navPush() {
    this.navCtrl.push("AddPlacePage");
  }

  onOpenPlace(place: Place, index: number) {
    const modal = this.modalCtrl.create('PlacePage', {place: place, index: index});
    modal.present();
  }

}
