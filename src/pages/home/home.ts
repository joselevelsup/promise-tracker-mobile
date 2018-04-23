import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import ApiService from "../../api/api";
import { SurveyDetailPage } from "../survey-detail/survey-detail";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  code = {
    number: null
  };

  surveys: any;

    constructor(public navCtrl: NavController, private toastCtrl: ToastController, public api: ApiService) {}

    getData(){
      const self = this;
      self.api.getSurveyData(self.code.number).subscribe(
        (data) => {
          self.api.insertFormData(data).then((data) => {
            self.loadSurveys(); //Loads Survey in when inserted.
          }).catch((err) => {
            console.log(err);
          });
        },
        (err) => {
          console.log(err);
        }
      )
    }

    loadSurveys(){
      const self = this;
      let surveys = [];
        this.api.loadLocalForms().then((data) => {
          console.log(data);
          for(var i = 0; i < data.rows.length; i++){
            surveys.push({
              id: data.rows.item(i).id,
              survey_id: data.rows.item(i).survey_id
            });
          }
          self.surveys = surveys;
        }).catch((err) => {
          console.log(err);
        });
    }

    openSurvey(id){
      this.navCtrl.push("survey-detail", {
        "id": id
      });
    }

    //Loads after a certain amount of time. Can not open the DB immediately because Angular would read the DB object as undefined
    ionViewDidLoad(){
      const self = this;
      setTimeout(() => {
        self.loadSurveys();
      }, 3000);
    }

  // sendData(){
  //   this.api.sendData(this.sendingData).subscribe(
  //     data => console.log(data),
  //     err => console.log(err)
  //   );
  // }
}
