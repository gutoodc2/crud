import { FiltrosComponent } from './../filtros/filtros.component';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { TabelaService } from '../tabela.service';
import { MatPaginator} from '@angular/material/paginator'
import {MatSort} from '@angular/material/sort';

import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements OnInit {

  public usuarios: Observable<Object[]>;
  dataSource: MatTableDataSource<any[]>;

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


}
