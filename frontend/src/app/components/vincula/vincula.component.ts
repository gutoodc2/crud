import { VinculaService } from './../vincula.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface Usuario {
  nome: string;
  tag: string;
  nubank: string;
}

@Component({
  selector: 'app-vincula',
  templateUrl: './vincula.component.html',
  styleUrls: ['./vincula.component.css']
})
export class VinculaComponent implements OnInit {

  usuario: Usuario = {
    nome: '',
    tag: '',
    nubank: ''
  }

  pessoa: Usuario = {
    nome: '',
    tag: '',
    nubank: ''
  }

  usuariosTags = [];
  dataSource: MatTableDataSource<any[]>;

  constructor(private vinculaService: VinculaService) { }

  ngOnInit(): void {
    this.vinculaService.sendGetRequest().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  atualizar(): void{
    
    let temp = [];

    temp = this.dataSource.filteredData;

      for (let i = 0; i < temp.length; i++) {
        if(temp[i].nome[0]=="0" || temp[i].nome[0]=='1' ||
           temp[i].nome[0]=='2' || temp[i].nome[0]=='3' ||
           temp[i].nome[0]=='4' || temp[i].nome[0]=='5' ||
           temp[i].nome[0]=='6' || temp[i].nome[0]=='7' ||
           temp[i].nome[0]=='8' || temp[i].nome[0]=='9')
        {
          this.usuario.nome = "Sem Nome";
          this.usuario.tag   = temp[i].nome;
          this.usuario.nubank = temp[i].nubank;
          this.usuariosTags.push(this.usuario);
        }
      }
      console.log(this.usuariosTags);
  }

  vincularTag(): void{

    if(this.pessoa.nubank==""){
      this.pessoa.nubank = "null";
    }

    this.vinculaService.postJSON(this.pessoa).subscribe(() => {
    })

  }

}
