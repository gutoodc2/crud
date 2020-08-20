import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TabelaService {

  //Amazon
  //private REST_API_SERVER = "http://18.230.31.121:3005/GET";

  //Local
  private REST_API_SERVER = "http://192.168.234.41:3005/GET";
  //private REST_API_SERVER = "http://192.168.0.183:3005/GET";


  constructor(private httpClient: HttpClient) {}

  public sendGetRequest() {
    return this.httpClient.get(this.REST_API_SERVER);
  }
  

}




