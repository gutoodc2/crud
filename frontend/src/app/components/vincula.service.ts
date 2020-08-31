import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './vincula/vincula.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class VinculaService {

  //Amazon
  //private REST_API_SERVER = "http://18.230.31.121:3005/GET";

  //Local
  private REST_API_SERVER_GET = "http://192.168.234.14:3005/GET";
  private REST_API_SERVER_POST = "http://192.168.234.14:3005/insertUsuario";
  private REST_API_SERVER_GET_USERS_UNDEFINED = "http://192.168.234.14:3005/retornaUsuarioNaoCadastrado"
  //private REST_API_SERVER = "http://192.168.0.183:3005/GET";

  constructor(private httpClient: HttpClient,private snackBar: MatSnackBar) { }

  public sendGetRequest() {
    return this.httpClient.get(this.REST_API_SERVER_GET);
  }

  public sendGetUserRequest(){
    return this.httpClient.get(this.REST_API_SERVER_GET_USERS_UNDEFINED);
  }

  postJSON(pessoa: Usuario){
    return this.httpClient.post(this.REST_API_SERVER_POST,pessoa);
  }

  showMessage(msg:string): void{
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
    })
  }


  
}

