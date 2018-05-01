import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SurveyBegin } from './survey-begin';

@NgModule({
  declarations: [
    SurveyBegin,
  ],
  imports: [
    IonicPageModule.forChild(SurveyBegin),
  ],
})
export class SurveyBeginModule {}
