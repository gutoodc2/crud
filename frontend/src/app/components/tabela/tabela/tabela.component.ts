import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TabelaService } from '../tabela.service';
import { MatPaginator } from '@angular/material/paginator'
import { MatSort} from '@angular/material/sort';
//import { BreakpointObserver } from '@angular/cdk/layout';
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

  constructor(private tabelaService: TabelaService){}
              // private observer: BreakpointObserver){}

  displayedColumns = ['nome', 'data', 'hora'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    // this.observer.observe(['(max-width: 700px)', '(min-width: 500px)']).subscribe(result => {
    //   console.log(result);
    //   // Do something with the result
    // });


    this.tabelaService.sendGetRequest().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  updateData():void{
    //this.resetData();
    let data = this.tabelaService.updateTableData(this.dataSource,moment(this.range.value.start).format('L'),moment(this.range.value.end).format('L'),this.pessoa.nome);
    this.dataSource = new MatTableDataSource(data.filteredData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log('Dados retornados', this.dataSource);
  }

  resetData(): void{
    this.tabelaService.sendGetRequest().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log('pegou os dados');
    });
    console.log('resetou');
  }

}
