import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import ApiService from "../../api/api";
import { AboutPage } from "../about/about";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  sendingData = {
    name: "",
    color: ""
  };

    responses : any;
    db: any;

    constructor(public navCtrl: NavController, private toastCtrl: ToastController, public api: ApiService) {
        this.db = this.api.db();
    }

    public getData(refresh?){
        let self = this;
        if(refresh){
            this.api.getApiData().subscribe(
                (res: any) => {
                    // let localData = JSON.stringify(data);
                    // self.api.insertLocalData(localData).then(() => {
                    //     self.navCtrl.push(AboutPage);
                    // }).catch((err) => {
                    //     console.log(err);
                    // });
                    this.db.insert(res.payload);
                    console.log(this.db.find());
                },
                (err) => {
                    console.log(err);
                }
            );
        } else {
            console.log("Data already here");
        }
    }

    loadRefresher(refresher){
        this.getData(refresher);
    }

    ionViewDidLoad(){
        this.getData(true);
    }

  sendData(){
    this.api.sendData(this.sendingData).subscribe(
      data => console.log(data),
      err => console.log(err)
    );
  }
}
