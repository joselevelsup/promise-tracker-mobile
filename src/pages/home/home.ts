import { Component } from '@angular/core';
import { IonicPage, NavController, Modal, ModalController } from 'ionic-angular';

import ApiService from "../../api/api";
import { NewCampaignModalPage } from "../new-campaign-modal/new-campaign-modal";

@IonicPage({
    name: "home-page"
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  surveys: any;

    constructor(public navCtrl: NavController, private modal: ModalController, public api: ApiService) {}

    goToNewCampaignPage(){
      const self = this;
      const newSurveyModal : Modal = this.modal.create(NewCampaignModalPage);

      newSurveyModal.present();

      newSurveyModal.onDidDismiss(() => {
        self.loadSurveys();
      });
    }

    loadSurveys(){
      const self = this;
      let surveys = [];
        this.api.loadLocalForms().then((data) => {
          for(var i = 0; i < data.rows.length; i++){
            surveys.push({
                id: data.rows.item(i).id,
                title: data.rows.item(i).title
            });
          }
          self.surveys = surveys;
        }).catch((err) => {
          console.log(err);
        });
    }

    openSurvey(id){
      this.navCtrl.push("survey-begin", {
        "id": id
      });
    }

    //Loads after a certain amount of time. Can not open the DB immediately because Angular would read the DB object as undefined
    ionViewDidLoad(){
      const self = this;
      setTimeout(() => {
        self.loadSurveys();
      }, 1000);
    }
}
