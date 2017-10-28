import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPlacePage } from './add-place';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AddPlacePage,
  ],
  imports: [
     AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCcCbzZ8jayZzfJoaAvY3vJ0bhvdhR8cn0'
    }),
    IonicPageModule.forChild(AddPlacePage),
  ],
})
export class AddPlacePageModule {}
