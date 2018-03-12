import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';


@Injectable()
export default class ApiService {
  constructor(private http: HttpClient){}

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization': "85823f6d6a9167b1ff947a18b176c09a"
    }),
    params: null
  }

  getData(){
    return this.http.get("http://localhost:3000/test-responses");
  }

  sendData(data){
    this.httpOptions.params = {
      answers: JSON.stringify(data)
    };
    return this.http.post("http://localhost:3000/test-responses", data, this.httpOptions);
  }
}
