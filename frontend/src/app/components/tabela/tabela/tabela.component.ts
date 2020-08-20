import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TabelaService } from '../tabela.service';
import { MatPaginator} from '@angular/material/paginator'
import {MatSort} from '@angular/material/sort';

import { MatTableDataSource } from '@angular/material/table';

import * as moment from 'moment/moment';

export interface Pessoa {
  nome: string;
}

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements OnInit {

  dataSource: MatTableDataSource<any[]>;

  pessoa: Pessoa = {
    nome: ''
  }

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(private tabelaService: TabelaService) { }

  displayedColumns = ['nome', 'data', 'hora'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.tabelaService.sendGetRequest().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  updateData(): void{

    var dateInicio = moment(this.range.value.start).format('L');
    var dateFim = moment(this.range.value.end).format('L');
    var date;

    var dataTemp;

    console.log('Data inicio ',dateInicio);
    console.log('Data fim ',dateFim);
    console.log(this.pessoa.nome);

    let dadosCapturados = [];
    let dadosFinais;

    // if(moment(dateInicio,"DD/MM/YYYY").isValid() && moment(dateFim,"DD/MM/YYYY").isValid()){
    //   for (let i = 0; i < this.dataSource.filteredData.length; i++) {
    //     date = moment(this.dataSource.filteredData[i]["data"],"DD/MM/YYYY").format('DD/MM/YYYY')
    //     if(date >= dateInicio && date <= dateFim){
    //       dadosCapturados.push(this.dataSource.filteredData[i]);
    //     }
    //   }
    // }else{     
    //   this.tabelaService.sendGetRequest().subscribe((data: any) => {
    //     this.dataSource = new MatTableDataSource(data);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //   })
    // }

    //this.resetData();

    /// LÓGICAS DE FILTRAGEM ///
    if(this.pessoa.nome=="" && !(moment(dateInicio,"DD/MM/YYYY").isValid() && moment(dateFim,"DD/MM/YYYY").isValid())){
      //console.log("show all");
      this.tabelaService.sendGetRequest().subscribe((data: any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    }
    if(!(this.pessoa.nome=="") && !(moment(dateInicio,"DD/MM/YYYY").isValid() && moment(dateFim,"DD/MM/YYYY").isValid())){
      //console.log("show all names");
      for (let i = 0; i < this.dataSource.filteredData.length; i++) {
        dataTemp = this.dataSource.filteredData[i];
        if(this.pessoa.nome == dataTemp.nome){
          dadosCapturados.push(this.dataSource.filteredData[i]);
        }
      }
      dadosFinais = new MatTableDataSource(dadosCapturados);
      console.log(dadosFinais);
  
      this.dataSource = new MatTableDataSource(dadosFinais.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    if(this.pessoa.nome=="" && (moment(dateInicio,"DD/MM/YYYY").isValid() && moment(dateFim,"DD/MM/YYYY").isValid())){
      //console.log("show all dates");
      for (let i = 0; i < this.dataSource.filteredData.length; i++) {
        date = moment(this.dataSource.filteredData[i]["data"],"DD/MM/YYYY").format('DD/MM/YYYY')
        if(date >= dateInicio && date <= dateFim){
          dadosCapturados.push(this.dataSource.filteredData[i]);
        }
      }
      dadosFinais = new MatTableDataSource(dadosCapturados);
      console.log(dadosFinais);
  
      this.dataSource = new MatTableDataSource(dadosFinais.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    if(!(this.pessoa.nome=="") && ((moment(dateInicio,"DD/MM/YYYY").isValid() && moment(dateFim,"DD/MM/YYYY").isValid()))){
      //console.log("show all names with dates");
      for (let i = 0; i < this.dataSource.filteredData.length; i++) {
        date = moment(this.dataSource.filteredData[i]["data"],"DD/MM/YYYY").format('DD/MM/YYYY')
        dataTemp = this.dataSource.filteredData[i];
        if((date >= dateInicio && date <= dateFim) && (this.pessoa.nome == dataTemp.nome)){
          dadosCapturados.push(this.dataSource.filteredData[i]);
        }
      }
      dadosFinais = new MatTableDataSource(dadosCapturados);
      console.log(dadosFinais);
  
      this.dataSource = new MatTableDataSource(dadosFinais.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    // dadosFinais = new MatTableDataSource(dadosCapturados);
    // console.log(dadosFinais);

    // this.dataSource = new MatTableDataSource(dadosFinais.data);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  resetData(): void{
    this.tabelaService.sendGetRequest().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

}
