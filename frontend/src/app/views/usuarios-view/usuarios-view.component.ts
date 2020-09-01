import { Subscription } from 'rxjs';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios-view',
  templateUrl: './usuarios-view.component.html',
  styleUrls: ['./usuarios-view.component.css']
})
export class UsuariosViewComponent implements OnInit {

  mediaSub:Subscription;
  deviceXs: boolean;

  constructor(public MediaObserver:MediaObserver) { }

  ngOnInit(): void {
    this.mediaSub = this.MediaObserver.media$.subscribe((result:MediaChange)=>{
      this.deviceXs = result.mqAlias == 'xs' ? true : false;
    })
  }

}
