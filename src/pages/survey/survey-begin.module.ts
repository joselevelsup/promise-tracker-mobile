import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SurveyBegin } from './survey-begin';
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  declarations: [
    SurveyBegin,
  ],
  imports: [
      IonicPageModule.forChild(SurveyBegin),
      TranslateModule
  ],
    exports: [
        TranslateModule
    ]
})
export class SurveyBeginModule {}
