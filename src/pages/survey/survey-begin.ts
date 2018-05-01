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

  surveyData: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiService){}

    ionViewDidLoad(){
        const self = this;
        const id = this.navParams.get("id");
        this.api.loadOneForm(id).then((data) => {
          self.surveyData = {
            title: data.rows.item(0).title,
            survey_id: data.rows.item(0).survey_id,
            form: JSON.parse(data.rows.item(0).form)
          };
        }).catch((err) => {
            console.log(err);
        });
    }
}
