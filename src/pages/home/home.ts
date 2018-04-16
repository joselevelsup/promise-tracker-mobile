import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import ApiService from "../../api/api";
import { AboutPage } from "../about/about";

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
      self.api.getSurveyData(this.code.number).subscribe(
        (data) => {
          self.api.insertFormData(data).then((data) => {
            console.log(data);
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
          for(var i = 0; i < data.rows.length; i++){
            surveys.push({
              id: data.rows.item(i).id,
              survey_id: data.rows.item(i).survey_id,
              form: data.rows.item(i).form
            });
          }
          self.surveys = surveys;
          console.log(data);
          console.log(data.rows.item());
        }).catch((err) => {
          console.log(err);
        });
    }

    // ionViewDidLoad(){
    //   this.api.loadLocalForms().then((data) => {
    //     console.log(data);
    //   }).catch((err) => {
    //     console.log(err);
    //   });
    // }

  // sendData(){
  //   this.api.sendData(this.sendingData).subscribe(
  //     data => console.log(data),
  //     err => console.log(err)
  //   );
  // }
}
