import { Component, ApplicationRef } from '@angular/core';
import { App, IonicPage, NavController, Modal, ModalController } from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";
import { Network } from "@ionic-native/network";

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
    connection: boolean;

    constructor(public app: App, public navCtrl: NavController, private modal: ModalController, public api: ApiService, private translate: TranslateService, private network: Network, private appRef: ApplicationRef) {
        this.network.onConnect().subscribe(() => {
                    // We just got a connection but we need to wait briefly
                    // before we determine the connection type. Might need to wait.
                    // prior to doing any api requests as well.
            setTimeout(() => {
                console.log("something");
                        if(this.network.type !== 'none') {
                            this.connection = true;
                            appRef.tick();
                        } else{
                            this.connection = true;
                            appRef.tick();
                        }
                    }, 3000);
        });
    }

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
        this.app.getRootNavs()[0].setRoot("survey-begin", {
        "id": id
      });
    }

    ionViewDidLoad(){
        const self = this;
        this.api.getDbState().subscribe(ready => {
            if(ready){
                self.loadSurveys();
                console.log(self.connection);
                if(self.connection == true){
                    console.log("connected");
                }
            }
        });
    }
}
