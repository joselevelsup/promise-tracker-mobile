import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, AlertController } from 'ionic-angular';
import { Geolocation } from "@ionic-native/geolocation";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { GoogleMaps, GoogleMap, GoogleMapsEvent, Marker, GoogleMapOptions } from "@ionic-native/google-maps";
import { TranslateService } from "@ngx-translate/core";

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
    loaded: boolean = false;
    surveyId: any;

    map: GoogleMap;
    @ViewChild("slides") slides: Slides;
    cancel: string;
    del: string;
    cameraError: boolean;
    mapError: boolean;
    surveyAnswersGood: boolean;
    surveyAnswersErr: boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiService, private geolocation: Geolocation, private camera: Camera, private alertCtrl: AlertController, private translate: TranslateService) {
    this.answers = {
      image: null
    };
  }

    ngOnInit(){
        setTimeout(() => {
            this.slides.lockSwipes(true);
        }, 500);
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
        setTimeout(() => {
            self.loaded = true;
        }, 400);
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

        let mapOptions : GoogleMapOptions = {
            camera: {
                target: {
                    lat: self.answers.coords.lat,
                    lng: self.answers.coords.long
                },
                zoom: 18
            }
        }
        self.map = GoogleMaps.create("mapCanvas", mapOptions);
        self.map.addMarker({
            icon: "blue",
            animation: "DROP",
            position: {
                lat: self.answers.coords.lat,
                lng: self.answers.coords.long
            }
        }).then((marker: Marker) => {
            marker.showInfoWindow()
        });

    }).catch((err) => {
        self.mapError = true;
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
        self.cameraError = true;
    });
  }

    alertForHome(){
        const self = this;
        self.translate.get(['DELETE', 'CANCEL']).subscribe((resp: any) => {
            self.del = resp.DELETE;
            self.cancel = resp.CANCEL;
        });
        let homeAlert = self.alertCtrl.create({
            message: "Are you sure you want to delete this response? All data fro this response will be lost.",
            buttons:
            [{
                text: self.cancel,
                role: "cancel"
            },{
                text: self.del,
                handler: () => {
                    self.navCtrl.setRoot("tabs");
                }
            }]
        });

        homeAlert.present();
    }

    sendAnswers(){
        const self = this;
      this.api.sendSurveyAnswers(this.answers).subscribe(
          data => {
              console.log(data);
              //self.navCtrl.setRoot("tabs");
          },
          err => {
              console.log(err);
              //self.saveAnswers();
          }
      )
  }

  saveAnswers(){
    let resp = {
      surveyId: this.surveyId,
      body: this.answers
    };
      this.api.insertResponseData(resp).then((data) => {
          console.log(data)
        this.navCtrl.setRoot("tabs");
    }).catch((err) => {
      console.log(err);
    })
  }

}
