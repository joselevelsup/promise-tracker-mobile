import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import ApiService from "../../api/api";

@IonicPage()
@Component({
  selector: 'page-new-campaign-modal',
  templateUrl: 'new-campaign-modal.html',
})
export class NewCampaignModalPage {

  code = {
    number: null
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController, private api: ApiService) {}

  getData(){
    const self = this;
    self.api.getSurveyData(self.code.number).subscribe(
        (data : any) => {
            if(data.status == "success"){
                self.api.insertFormData(data.payload, self.code.number).then((data) => {
                  self.closeModal();
                }).catch((err) => {
                  console.log(err);
                });
            }

      },
      (err) => {
        console.log(err);
      }
    )
  }

  closeModal(){
    this.view.dismiss();
  }

}
