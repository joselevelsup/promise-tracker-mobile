import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewCampaignModalPage } from './new-campaign-modal';

@NgModule({
  declarations: [
    NewCampaignModalPage,
  ],
  imports: [
    IonicPageModule.forChild(NewCampaignModalPage),
  ],
})
export class NewCampaignModalPageModule {}
