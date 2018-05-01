import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";

@Injectable()
export default class ApiService {
    database: SQLiteObject;
    constructor(
        private http: HttpClient,
        private sqlite: SQLite
    ){
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
        return this.http.get("http://a91991ed.ngrok.io/surveys/"+id);
    }

    getResponseData(){
        return this.http.get("http://a91991ed.ngrok.io/test-responses");
    }

  public sendData(data){
    this.httpOptions.params = {
      answers: JSON.stringify(data)
    };
    return this.http.post("http://a91991ed.ngrok.io/test-responses", data, this.httpOptions);
  }



    private dbSetup(){
        return this.sqlite.create({
            name: "responses.db",
            location: "default"
        }).then((db: SQLiteObject) => {
            db.executeSql('CREATE TABLE IF NOT EXISTS responses(id INTEGER PRIMARY KEY, body TEXT, survey_id INTEGER, synced INTEGER)', {})
            .then(() => {
              return db.executeSql('CREATE TABLE IF NOT EXISTS surveys(id INTEGER PRIMARY KEY, title TEXT, survey_id INTEGER, form TEXT)', {});
            }).then(() => {
              return db.executeSql('CREATE TABLE IF NOT EXISTS images(id INTEGER PRIMARY KEY, location TEXT, synced INTEGER, response_id INTEGER, FOREIGN KEY(response_id) REFERENCES responses(id))', {});
            }).catch((err) => {
                console.log(err);
            });

            this.database = db;
        })
    }

    public insertResponseData(data){
      return this.database.executeSql("INSERT INTO responses(response) VALUES(?)", [data])
    }

    public loadResponseData(surveyId){
      return this.database.executeSql(`SELECT * FROM responses WHERE survey_id = ${surveyId}`, {});
    }

    public insertFormData(data){
        return this.database.executeSql("INSERT INTO surveys(id, title, survey_id, form) VALUES (?, ?, ?, ?)", [data.id, data.title, data.campaign_id, JSON.stringify(data.inputs)])
    }

    public loadLocalForms(){
      return this.database.executeSql("SELECT id, title FROM surveys", {});
    }

    public loadOneForm(id){
      return this.database.executeSql(`SELECT * FROM surveys WHERE id=${id}`, {});
    }

}
