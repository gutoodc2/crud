import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';
import { Usuario } from '../vincula/vincula.component';
import { MatTableDataSource } from '@angular/material/table';

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
    return this.httpClient.post(this.REST_API_SERVER_DELETE,pessoa);
  }

  public updateTableData(dataSource,pessoaFiltro){

    var dataTemp;
    let dadosCapturados = [];

    if(pessoaFiltro.nubank==""){
      pessoaFiltro.nubank="null";
    }
    
    if(pessoaFiltro.nome=="" && pessoaFiltro.tag=="" && pessoaFiltro.nubank=="null"){
      return(dataSource);
    }
    
    if(!(pessoaFiltro.nome=="") && !(pessoaFiltro.tag=="") && pessoaFiltro.nubank=="null"){
      for (let i = 0; i < dataSource.filteredData.length; i++) {
        dataTemp = dataSource.filteredData[i];
        if(pessoaFiltro.nome==dataTemp.nome && pessoaFiltro.tag==dataTemp.tag){
          dadosCapturados.push(dataSource.filteredData[i]);
        }
      }
      dataSource = new MatTableDataSource(dadosCapturados);
      return(dataSource);
    }

    if(pessoaFiltro.nome=="" && pessoaFiltro.tag=="" && !(pessoaFiltro.nubank=="null")){
      for (let i = 0; i < dataSource.filteredData.length; i++) {
        dataTemp = dataSource.filteredData[i];
        if(pessoaFiltro.nubank==dataTemp.nubank){
          dadosCapturados.push(dataSource.filteredData[i]);
        }
      }
      dataSource = new MatTableDataSource(dadosCapturados);
      return(dataSource);
    }

    if(!(pessoaFiltro.nome=="") && pessoaFiltro.tag=="" && !(pessoaFiltro.nubank=="null")){
      for (let i = 0; i < dataSource.filteredData.length; i++) {
        dataTemp = dataSource.filteredData[i];
        if(pessoaFiltro.nubank==dataTemp.nubank && pessoaFiltro.nome==dataTemp.nome){
          dadosCapturados.push(dataSource.filteredData[i]);
        }
      }
      dataSource = new MatTableDataSource(dadosCapturados);
      return(dataSource);
    }

    if(!(pessoaFiltro.nome=="") && !(pessoaFiltro.tag=="") && !(pessoaFiltro.nubank=="null")){
      for (let i = 0; i < dataSource.filteredData.length; i++) {
        dataTemp = dataSource.filteredData[i];
        if(pessoaFiltro.nome==dataTemp.nome && pessoaFiltro.tag==dataTemp.tag && pessoaFiltro.nubank==dataTemp.nubank){
          dadosCapturados.push(dataSource.filteredData[i]);
        }
      }
      dataSource = new MatTableDataSource(dadosCapturados);
      return(dataSource);
    }

    if(pessoaFiltro.nome=="" && !(pessoaFiltro.tag=="") && !(pessoaFiltro.nubank=="null")){
      for (let i = 0; i < dataSource.filteredData.length; i++) {
        dataTemp = dataSource.filteredData[i];
        if(pessoaFiltro.tag==dataTemp.tag && pessoaFiltro.nubank==dataTemp.nubank){
          dadosCapturados.push(dataSource.filteredData[i]);
        }
      }
      dataSource = new MatTableDataSource(dadosCapturados);
      return(dataSource);
    }

    if(!(pessoaFiltro.nome=="") && pessoaFiltro.tag=="" && pessoaFiltro.nubank=="null"){
      for (let i = 0; i < dataSource.filteredData.length; i++) {
        dataTemp = dataSource.filteredData[i];
        if(pessoaFiltro.nome==dataTemp.nome){
          dadosCapturados.push(dataSource.filteredData[i]);
        }
      }
      dataSource = new MatTableDataSource(dadosCapturados);
      return(dataSource);
    }

  }

}
