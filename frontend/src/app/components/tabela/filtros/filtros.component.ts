import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TabelaService } from '../tabela.service';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment/moment';

export interface Element {
  id: string;
  nome: string;
  data: string;
  hora: string;
}

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css']
})
export class FiltrosComponent implements OnInit {
  
  public usuarios: Observable<Object[]>;

  dataSource: MatTableDataSource<Element>;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(private tabelaService: TabelaService) { }

  ngOnInit(): void {
    this.tabelaService.sendGetRequest().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      //this.dataFiltered = new MatTableDataSource(data);
      console.log(this.dataSource)
    })
  }

  updateData(): void{

    var dateInicio = moment(this.range.value.start).format('L')
    var dateFim = moment(this.range.value.end).format('L')
    var date

    console.log('Data inicio ',dateInicio)
    console.log('Data fim ',dateFim)

    let dadosCapturados = [];
    let dadosFinais;

    for (let i = 0; i < this.dataSource.filteredData.length; i++) {
      date = moment(this.dataSource.filteredData[i]["data"],"DD/MM/YYYY").format('DD/MM/YYYY')
      if(date >= dateInicio && date <= dateFim){
        dadosCapturados.push(this.dataSource.filteredData[i]);
      }
    }
    dadosFinais = new MatTableDataSource(dadosCapturados);
    console.log(dadosFinais);

  }

}
