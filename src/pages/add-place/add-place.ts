import { Component } from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {Location} from "../../models/location.interface";
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {PlacesService} from "../../providers/places/places.service";
import {Entry, File, FileError} from '@ionic-native/file';

declare var cordova: any;

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
    encodingType: this.camera.EncodingType.JPEG,
    correctOrientation: true,
    mediaType: this.camera.MediaType.PICTURE
  }

  locationIsSet = false;
  imageUrl: string;

  constructor(
    private file: File,
    private placesSrv: PlacesService,
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
      const currentName = imageData.replace(/^.*[\\\/]/, '');
      const path = imageData.replace(/[^\/]*$/, '');
      this.file.moveFile(path, currentName, cordova.file.dataDirectory, currentName)
        .then(
          (data: Entry)  => {
            this.imageUrl = data.nativeURL;
            this.camera.cleanup();
            // this.file.removeFile(path, currentName);
          }
        )
        .catch(
          (err: FileError) => {
            this.imageUrl = '';
            const toast = this.toastCtrl.create({
              message: 'Could not save image, Try again!',
              duration: 4000
            });
            toast.present();
            this.camera.cleanup();
          }
        )
      this.imageUrl = imageData;
    }, (err) => {
      const toast = this.toastCtrl.create({
              message: 'Could not take image, Try again!',
              duration: 4000
            });
      toast.present();
      this.camera.cleanup()
      console.error(err);
    });
  }

  onSubmit(form: NgForm) {
      this.placesSrv.addPlace(form.value.title, form.value.description, this.location, this.imageUrl);
      form.reset();
      this.location = {
        lat: -1.28333,
        lng: 36.81667
      };
      this.imageUrl = '';
      this.locationIsSet = false;
  }

}
