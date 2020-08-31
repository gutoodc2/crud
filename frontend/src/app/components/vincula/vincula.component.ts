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

  pessoa: Usuario = {
    nome: '',
    tag: '',
    nubank: ''
  }

  usuariosTags = [];
  dataSource: MatTableDataSource<any[]>;

  constructor(private vinculaService: VinculaService) { }

  ngOnInit(): void {
    this.vinculaService.sendGetUserRequest().subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        this.usuariosTags.push(data[i]);
      }
      // console.log(this.usuariosTags);
    })
  }

  atualizar(): void{
    this.usuariosTags = [];
    this.vinculaService.sendGetUserRequest().subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        this.usuariosTags.push(data[i]);
      }
      // console.log(this.usuariosTags);
    })

  }

  vincularTag(): void{

    if(this.pessoa.nubank==""){
      this.pessoa.nubank = "null";
    }

    console.log(this.pessoa);

    this.vinculaService.postJSON(this.pessoa).subscribe(() => {
    })

    this.vinculaService.showMessage('Usuário Vinculado!');

    this.pessoa.nome="";
    this.pessoa.tag="";
    this.pessoa.nubank="";

    this.atualizar();
  }

}
