import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, AlertController } from 'ionic-angular';
import { Geolocation } from "@ionic-native/geolocation";
import { Camera, CameraOptions } from "@ionic-native/camera";
import ApiService from "../../api/api";

@IonicPage({
    name: "survey-detail",
    segment: "survey/:id/detail"
})
@Component({
  selector: 'page-survey-detail',
  templateUrl: 'survey-detail.html',
})
export class SurveyDetailPage implements OnInit {
  questions: any;
  title: any;
  index: any;
  answers: any = {};
  surveyId: any;
  @ViewChild("slides") slides: Slides;
    constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiService, private geolocation: Geolocation, private camera: Camera, private alertCtrl: AlertController) {
    this.answers = {
      image: null
    };
  }

  ngOnInit(){
    this.slides.lockSwipes(true);
  }

  ionViewWillLoad() {
    const self = this;
    const id = this.navParams.get("id");
    this.api.loadOneForm(id).then((data) => {
      self.title = data.rows.item(0).title;
      self.surveyId = data.rows.item(0).survey_id;
      let qs = JSON.parse(data.rows.item(0).form);
      let newSet = qs.sort((a, b) => a.order - b.order);
      self.questions = newSet;
    }).catch((err) => {
      console.log(err);
    })
  }

  previousSlide(){
    this.index = this.slides.getActiveIndex() - 1;
    this.slides.lockSwipes(false);
    this.slides.slideTo(this.index);
    this.slides.lockSwipes(true);
  }

  nextSlide(){
    this.index = this.slides.getActiveIndex() + 1;
    this.slides.lockSwipes(false);
    this.slides.slideTo(this.index);
    this.slides.lockSwipes(true);
  }

  getLocation(){
    const self = this;
    let options = {
      timeout: 5000,
      enableHighAccuracy: true,
      maximumAge: 3600
    };

    this.geolocation.getCurrentPosition(options).then((resp) => {
      self.answers.coords = {
        lat: resp.coords.latitude,
        long: resp.coords.longitude
      };
    }).catch((err) => {
      console.log(err);
    })
  }

  openCamera(){
    const self = this;
    const opts: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI
    };

    this.camera.getPicture(opts).then((imageData) => {
      self.answers.image = imageData;
    }).catch((err) => {
      console.log(err);
    });
  }

    alertForHome(){
        console.log("clicked");
        const self = this;
        let homeAlert = self.alertCtrl.create({
            message: "Are you sure you want to delete this response? All data fro this response will be lost.",
            buttons:
            [{
                text: "Cancel",
                role: "cancel"
            },{
                text: "Delete",
                handler: () => {
                    self.navCtrl.setRoot("tabs");
                }
            }]
        });

        homeAlert.present();
    }

  sendAnswers(){
    
    // this.api.sendSurveyAnswers(this.answers).then(())
  }

  saveAnswers(){
    let resp = {
      surveyId: this.surveyId,
      body: this.answers
    };
    this.api.insertResponseData(resp).then((data) => {
        this.navCtrl.push("home-page");
    }).catch((err) => {
      console.log(err);
    })
  }

}
