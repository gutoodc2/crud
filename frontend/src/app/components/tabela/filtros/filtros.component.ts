import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TabelaService } from '../tabela.service';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css']
})
export class FiltrosComponent implements OnInit {
  
  public usuarios: Observable<Object[]>;
  dataSource: MatTableDataSource<any[]>;
  
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(private tabelaService: TabelaService) { }

  ngOnInit(): void {
    this.tabelaService.sendGetRequest().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      console.log(this.dataSource)
    })
  }

  updateData():void {
    var inicio = this.dataSource.filteredData[0]["data"]
    // var momentInicio = moment(inicio, 'MM-DD-YYYY')

    console.log(inicio)
    // console.log('data inicio', this.range.value.start);
    // console.log('Data moment', moment(this.range.value.start).format('L'));
    

    // console.log(this.dataSource.filteredData[0]["data"])
  }


}
