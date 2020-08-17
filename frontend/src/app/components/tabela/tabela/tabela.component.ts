import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { TabelaService } from '../tabela.service';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements AfterViewInit, OnInit {

  public usuarios: Observable<Object[]>;

  constructor(private tabelaService: TabelaService) { }

  displayedColumns = ['Nome', 'Data', 'Hora'];

  ngOnInit() {
    this.tabelaService.sendGetRequest().subscribe((data: any) => {
      this.usuarios = data;
      console.log(data);
    })
  }

  ngAfterViewInit() {
    // this.usuarios.sort = this.sort;
    // this.usuarios.paginator = this.paginator;
    // this.table.usuarios = this.usuarios;
  }
}
