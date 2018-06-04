import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { BehaviorSubject } from "rxjs/Rx";

@Injectable()
export default class ApiService {
    database: SQLiteObject;
    private dbReady : BehaviorSubject<boolean>;
    constructor(
        private http: HttpClient,
        private sqlite: SQLite
    ){
        this.dbReady = new BehaviorSubject(false);
        this.dbSetup();
    }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization': "85823f6d6a9167b1ff947a18b176c09a"
    }),
    params: null
  }

    public getSurveyData(id){
        return this.http.get("http://74eaf3da.ngrok.io/surveys/"+id);
    }

    getResponseData(){
        return this.http.get("http://74eaf3da.ngrok.io/test-responses");
    }

  public sendSurveyAnswers(data){
    this.httpOptions.params = {
      answers: JSON.stringify(data)
    };
    return this.http.post("https://908b3c50.ngrok.io/test-responses", data, this.httpOptions);
  }



    private dbSetup(){
        const self = this;
        return this.sqlite.create({
            name: "responses.db",
            location: "default"
        }).then((db: SQLiteObject) => {
            db.executeSql('CREATE TABLE IF NOT EXISTS responses(id INTEGER PRIMARY KEY, body TEXT, survey_id INTEGER, synced INTEGER)', {})
            .then(() => {
              return db.executeSql('CREATE TABLE IF NOT EXISTS surveys(id INTEGER PRIMARY KEY, title TEXT, survey_id INTEGER, survey_code INTEGER, form TEXT)', {});
            }).then(() => {
              return db.executeSql('CREATE TABLE IF NOT EXISTS images(id INTEGER PRIMARY KEY, location TEXT, synced INTEGER, response_id INTEGER, FOREIGN KEY(response_id) REFERENCES responses(id))', {});
            }).catch((err) => {
                console.log(err);
            });
            self.database = db;
            self.dbReady.next(true);
        })
    }

    public insertResponseData(data){
        let responses = JSON.stringify(data.body);
        if(data.body.image == null){
            return this.database.executeSql("INSERT INTO responses(body, survey_id, synced) VALUES(?, ?, ?)", [responses, data.surveyId, 0])
        } else {
            return this.database.executeSql("INSERT INTO responses(body, survey_id, synced) VALUES(?, ?, ?)", [responses, data.surveyId, 0]).then((resp) => {
                return this.database.executeSql("INSERT INTO images(location, synced, response_id) VALUES(?, ?, ?)", [data.body.image, 0, resp.insertId]);
            })
        }
    }

    public syncResponses(){
        this.database.executeSql("SELECT * FROM responses WHERE synced = 0", {}).then((data: any) => {
            for(let i = 0; i < data.rows.length; i++){
                console.log(data.rows.item(i));
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    public loadResponseData(surveyId){
      return this.database.executeSql(`SELECT * FROM responses WHERE survey_id = ${surveyId}`, {});
    }

    public insertFormData(data, code){
        const self = this;
        return new Promise((resolve, reject) => {
            self.database.executeSql(`SELECT survey_id FROM surveys where survey_id = ${data.campaign_id}`, {}).then((resp) => {
                if(resp.rows.item(0) === undefined){
                    self.database.executeSql("INSERT INTO surveys(id, title, survey_id, survey_code, form) VALUES (?, ?, ?, ?, ?)", [data.id, data.title, data.campaign_id, code, JSON.stringify(data.inputs)]).then((data) => {
                        resolve(data);
                    }).catch((err) => {
                        reject(err);
                    })
                } else {
                    resolve({ "exists": true });
                }
            }).catch((err) => {
                reject(err);
            });
        });
    }

    public loadLocalForms(){
      return this.database.executeSql("SELECT id, title FROM surveys", {});
    }

    public loadOneForm(id){
      return this.database.executeSql(`SELECT * FROM surveys WHERE id=${id}`, {});
    }

    public getDbState(){
        return this.dbReady.asObservable();
    }

}
