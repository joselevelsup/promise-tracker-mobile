import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import ApiService from "../../api/api";

@IonicPage({
    name: "survey-detail",
    segment: "survey/:id/detail"
})
@Component({
  selector: 'page-survey-detail',
  templateUrl: 'survey-detail.html',
})
export class SurveyDetailPage {
  questions : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiService) {}

  ionViewDidLoad() {
    const self = this;
    const id = this.navParams.get("id");
      this.api.loadOneForm(id).then((data) => {
          console.log(JSON.parse(data.rows.item(0).form));
          let questions = JSON.parse(data.rows.item(0).form);
          let newSet = questions.map((q, i) => {
              switch(q.input_type){
                  case "select1":
                      q.input_type = "checkbox";
                      break;
                  case "select":
                      q.input_type = "radio";
                      break;
                  default:
                      break;
              }
              return q;
          });
          console.log(newSet);
      self.questions = newSet;
    }).catch((err) => {
      console.log(err);
    })
  }

}
