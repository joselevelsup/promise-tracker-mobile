import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SurveyDetailPage } from './survey-detail';
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  declarations: [
    SurveyDetailPage,
  ],
  imports: [
      IonicPageModule.forChild(SurveyDetailPage),
      TranslateModule
  ],
    exports: [
        TranslateModule
    ]
})
export class SurveyDetailPageModule {}
