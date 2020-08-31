import { DialogBoxComponent } from './../../views/dialog-box/dialog-box.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UsuariosService } from './usuarios.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

export interface Usuario {
  nome: string;
  tag: string;
  nubank: string;
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  pessoa: Usuario = {
    nome: '',
    tag: '',
    nubank: ''
  }

  dataSource: MatTableDataSource<any[]>;

  constructor(private usuariosService: UsuariosService,public dialog: MatDialog) { }

  displayedColumns = ['nome', 'tag', 'nubank', 'action'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    this.usuariosService.sendGetRequest().subscribe((data: any) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Deletar'){
        this.deleteRowData(result.data);
      }
    });
  }

  deleteRowData(row_obj){

    this.pessoa.nome = row_obj.nome;
    this.pessoa.tag = row_obj.tag;
    this.pessoa.nubank = row_obj.nubank;

    this.usuariosService.deletUsuario(this.pessoa).subscribe(()=>{
    })
    
    console.log(this.pessoa);
  }

}
