import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import ApiService from "../../api/api";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
    db : any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiService) {
        // this.db = this.api.db();
    }

  ionViewDidLoad() {
      console.log('ionViewDidLoad AboutPage');
      // console.log(this.db.find());
      // this.api.loadLocalData().then((data) => {
      //     console.log(data.rows.item(0));
      //     console.log(data.rows.item(1));
      //     console.log(data.rows.item(2));
      // }).catch((err) => {
      //     console.log(err);
      // })
  }

}
