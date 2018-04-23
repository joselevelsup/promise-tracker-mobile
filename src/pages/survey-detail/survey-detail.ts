import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import ApiService from "../../api/api";

@IonicPage({
  name: "survey-detail",
  segment: "survey/:id"
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
      self.questions = JSON.parse(data.rows.item(0).form);
    }).catch((err) => {
      console.log(err);
    })
  }

}
