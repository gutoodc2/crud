import { Component, OnInit } from '@angular/core';
import { TabelaService } from 'src/app/components/tabela/tabela.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tabela-view',
  templateUrl: './tabela-view.component.html',
  styleUrls: ['./tabela-view.component.css']
})
export class TabelaViewComponent implements OnInit {

  public usuarios: Observable<Object[]>;

  // Associando o constructor do componente tabela ao service da tabela
  constructor(private tabelaService: TabelaService) { }

  ngOnInit(): void {
    this.tabelaService.sendGetRequest().subscribe((data: any) => {
      console.log(data);
      //console.log(data[1]["nome"]);
      this.usuarios = data;
    })
  }

  updateData(): void {
    //this.tabelaService.sendGetRequest().subscribe((data: any) => {
      //console.log(data);
      //console.log(data[1]["nome"]);
      //this.usuarios = data;
    //})
  }

}
