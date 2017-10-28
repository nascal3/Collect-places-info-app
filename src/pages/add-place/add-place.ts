import { Component } from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {Location} from "../../models/location.interface";
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the AddPlacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {

  location: Location = {
    lat: -1.28333,
    lng: 36.81667
  }

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    correctOrientation: true,
    mediaType: this.camera.MediaType.PICTURE
  }

  locationIsSet = false;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private geoLocation: Geolocation,
    private camera: Camera,
    private modalCtrl: ModalController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  onOpenMap() {
    const modal = this.modalCtrl.create('SetLocationPage', { location: this.location, isSet: this.locationIsSet});
    modal.present();
    modal.onDidDismiss(
      data => {
        if (data) {
          this.location = data.location;
          this.locationIsSet = true;
        }
      }
    )
  }

  onLocate() {
    const loader = this.loadingCtrl.create({
      content: 'Getting your location...'
    });
    loader.present();

     this.geoLocation.getCurrentPosition().then((location) => {
       this.location.lat = location.coords.latitude;
       this.location.lng = location.coords.longitude;
       loader.dismiss();
       this.locationIsSet = true;
       console.log(location);
      }).catch((error) => {
        loader.dismiss();
        const toast = this.toastCtrl.create({
          message: 'Opps! something went wrong could not get your location.',
          duration: 4000
        });
        toast.present();
        console.log('Error getting location', error);
      });
  }

  onTakePhoto() {
    this.camera.getPicture(this.options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     console.log(imageData);
    }, (err) => {
     console.error(err);
    });
  }

  onSubmit(form: NgForm) {
      console.log(form.value);
  }

}
