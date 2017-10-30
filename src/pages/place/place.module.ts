import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlacePage } from './place';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    PlacePage,
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCcCbzZ8jayZzfJoaAvY3vJ0bhvdhR8cn0'
    }),
    IonicPageModule.forChild(PlacePage),
  ],
})
export class PlacePageModule {}
