import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy{

  mediaSub:Subscription;
  deviceXs: boolean;

  constructor(public MediaObserver:MediaObserver) { }

  ngOnInit(): void {
    this.mediaSub = this.MediaObserver.media$.subscribe((result:MediaChange)=>{
      // console.log(result.mqAlias);
      this.deviceXs = result.mqAlias == 'xs' ? true : false;
      // console.log(this.deviceXs);
    })
  }

  ngOnDestroy(): void{
    this.mediaSub.unsubscribe();
  }

}