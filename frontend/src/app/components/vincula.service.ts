import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './vincula/vincula.component';

@Injectable({
  providedIn: 'root'
})
export class VinculaService {

  //Amazon
  //private REST_API_SERVER = "http://18.230.31.121:3005/GET";

  //Local
  private REST_API_SERVER = "http://192.168.234.14:3005/GET";
  private REST_API_SERVER_POST = "http://192.168.234.14:3005/insertUsuario";
  //private REST_API_SERVER = "http://192.168.0.183:3005/GET";

  constructor(private httpClient: HttpClient) { }

  public sendGetRequest() {
    return this.httpClient.get(this.REST_API_SERVER);
  }

  postJSON(pessoa: Usuario){
    return this.httpClient.post(this.REST_API_SERVER_POST,pessoa);
  }


  
}

