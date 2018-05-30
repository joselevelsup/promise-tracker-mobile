import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewCampaignModalPage } from './new-campaign-modal';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    NewCampaignModalPage,
  ],
  imports: [
      IonicPageModule.forChild(NewCampaignModalPage),
      TranslateModule
  ],
    exports: [
        TranslateModule
    ]
})
export class NewCampaignModalPageModule {}
