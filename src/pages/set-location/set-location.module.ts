import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetLocationPage } from './set-location';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    SetLocationPage,
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCcCbzZ8jayZzfJoaAvY3vJ0bhvdhR8cn0'
    }),
    IonicPageModule.forChild(SetLocationPage),
  ],
})
export class SetLocationPageModule {}
