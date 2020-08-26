import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment/moment';

@Injectable({
  providedIn: 'root'
})
export class TabelaService {

  //Amazon
  //private REST_API_SERVER = "http://18.230.31.121:3005/GET";

  //Local
  private REST_API_SERVER = "http://192.168.234.14:3005/GET";
  //private REST_API_SERVER = "http://192.168.0.183:3005/GET";


  constructor(private httpClient: HttpClient) {}

  public sendGetRequest() {
    return this.httpClient.get(this.REST_API_SERVER);
  }

  public updateTableData(dataSource, dateInicio, dateFim, nome){

    // var dataSource = dataSource
    // var dateInicio = dateInicio;
    // var dateFim = dateFIm;
    var date;
    // var nome = nome;

    var dataTemp;

    console.log('Data inicio ',dateInicio);
    console.log('Data fim ',dateFim);
    console.log(nome);

    let dadosCapturados = [];
    let dadosFinais;

    /// LÓGICAS DE FILTRAGEM ///
    if(nome=="" && !(moment(dateInicio,"DD/MM/YYYY").isValid() && moment(dateFim,"DD/MM/YYYY").isValid())){
      console.log("show all");
      this.sendGetRequest().subscribe((data: any) => {
        dataSource = new MatTableDataSource(data);
        console.log('teste: ', dataSource);
        return(dataSource.filteredData);
      })
    }
    if(!(nome=="") && !(moment(dateInicio,"DD/MM/YYYY").isValid() && moment(dateFim,"DD/MM/YYYY").isValid())){
      //console.log("show all names");
      for (let i = 0; i < dataSource.filteredData.length; i++) {
        dataTemp = dataSource.filteredData[i];
        if(nome == dataTemp.nome){
          dadosCapturados.push(dataSource.filteredData[i]);
        }
      }
      dadosFinais = new MatTableDataSource(dadosCapturados);
      dataSource = new MatTableDataSource(dadosFinais);
      return(dataSource.filteredData);
    }
    if(nome=="" && (moment(dateInicio,"DD/MM/YYYY").isValid() && moment(dateFim,"DD/MM/YYYY").isValid())){
      //console.log("show all dates");
      for (let i = 0; i < dataSource.filteredData.length; i++) {
        date = moment(dataSource.filteredData[i]["data"],"DD/MM/YYYY").format('DD/MM/YYYY')
        if(date >= dateInicio && date <= dateFim){
          dadosCapturados.push(dataSource.filteredData[i]);
        }
      }
      dadosFinais = new MatTableDataSource(dadosCapturados);
      dataSource = new MatTableDataSource(dadosFinais);
      return(dataSource.filteredData);
    }
    if(!(nome=="") && ((moment(dateInicio,"DD/MM/YYYY").isValid() && moment(dateFim,"DD/MM/YYYY").isValid()))){
      //console.log("show all names with dates");
      for (let i = 0; i < dataSource.filteredData.length; i++) {
        date = moment(dataSource.filteredData[i]["data"],"DD/MM/YYYY").format('DD/MM/YYYY')
        dataTemp = dataSource.filteredData[i];
        if((date >= dateInicio && date <= dateFim) && (nome == dataTemp.nome)){
          dadosCapturados.push(dataSource.filteredData[i]);
        }
      }
      dadosFinais = new MatTableDataSource(dadosCapturados);
      dataSource = new MatTableDataSource(dadosFinais);
      return(dataSource.filteredData);
    }
   
  }
  

}




