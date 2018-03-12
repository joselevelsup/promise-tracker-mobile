import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import ApiService from "../../api/api";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  sendingData = {
    name: "",
    color: ""
  };

  constructor(public navCtrl: NavController, public api: ApiService) {}

  loadData(){
    this.api.getData().subscribe(
      data => console.log(data),
      err => console.log(err)
    );
  }

  sendData(){
    this.api.sendData(this.sendingData).subscribe(
      data => console.log(data),
      err => console.log(err)
    );
  }
}
