import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";

import * as Loki from "lokijs";

@Injectable()
export default class ApiService {
    constructor(
        private http: HttpClient,
        private sqlite: SQLite
    ){
        //this.dbSetup();
    }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization': "85823f6d6a9167b1ff947a18b176c09a"
    }),
    params: null
  }

    getApiData(){
        return this.http.get("http://8b6a862c.ngrok.io/test-responses");
    }

  public sendData(data){
    this.httpOptions.params = {
      answers: JSON.stringify(data)
    };
    return this.http.post("http://355c8d90.ngrok.io/test-responses", data, this.httpOptions);
  }

    public db(){
        let rDb = new Loki("responses.json");
        let resp = rDb.addCollection("responses");

        return resp;
    }



    // private dbSetup(){
    //     return this.sqlite.create({
    //         name: "responses.db",
    //         location: "default"
    //     }).then((db: SQLiteObject) => {
    //         db.executeSql('CREATE TABLE IF NOT EXISTS responses(id INTEGER PRIMARY KEY, response TEXT)', {}).then(() => {}).catch((err) => {
    //             console.log(err);
    //         });

    //         return db;
    //     })
    // }

    // public insertLocalData(data){
    //     return this.dbSetup().then((db: SQLiteObject) => {
    //         return db.executeSql("INSERT INTO responses(response) VALUES(?)", [data])
    //     });
    // }

    // public loadLocalData(){
    //     return this.dbSetup().then((db: SQLiteObject) => {
    //         return db.executeSql("select * from responses", {});
    //     })
    // }
}
