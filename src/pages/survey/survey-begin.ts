import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import ApiService from "../../api/api";


@IonicPage({
    name: "survey-begin",
    segment: "survey/:id/begin"
})
@Component({
    selector: 'page-survey-begin',
    templateUrl: 'survey-begin.html'
})
export class SurveyBegin{

  surveyData: any = {
    title: null,
    id: null
  };
    constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiService){}

    ionViewWillEnter(){
      const self = this;
      const id = this.navParams.get("id");
      this.api.loadOneForm(id).then((data) => {
        self.surveyData = {
          title: data.rows.item(0).title,
          code: data.rows.item(0).survey_code,
          id: data.rows.item(0).id
        };
      }).catch((err) => {
          console.log(err);
      });
    }

    startSurvey(id){
      this.navCtrl.setRoot("survey-detail", {
        id: id
      });
    }

    backHome(){
        this.navCtrl.setRoot("tabs");
    }
}
