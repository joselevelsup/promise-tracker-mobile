import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { HomePage } from "../home/home";
import { AboutPage } from "../about/about";


@IonicPage({
    name: "tabs",
    segment: "tabs"
})
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

    tab1Root: any = HomePage;
    tab2Root : any = AboutPage;

    constructor(public navCtrl: NavController) {}
}
