import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';
import { Usuario } from '../vincula/vincula.component';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  //Amazon
  //private REST_API_SERVER = "http://18.230.31.121:3005/GET";

  //Local
  private REST_API_SERVER = "http://192.168.234.14:3005/getUsuarios";
  private REST_API_SERVER_DELETE = "http://192.168.234.14:3005/deletUsuario";
  //private REST_API_SERVER = "http://192.168.0.183:3005/GET";

  constructor(private httpClient: HttpClient) {}

  public sendGetRequest() {
    return this.httpClient.get(this.REST_API_SERVER);
  }

  deletUsuario(pessoa: Usuario){
    return this.httpClient.delete(this.REST_API_SERVER_DELETE,pessoa);
  }


}
