import { Component, Input, OnInit } from '@angular/core';
import { Wallpaper } from 'src/app/interfaces/wallpaper';

@Component({
  selector: 'app-backwimage',
  templateUrl: './backwimage.component.html',
  styleUrls: ['./backwimage.component.css']
})
export class BackwimageComponent implements OnInit {

  constructor() { }

  @Input() wallpaper: Wallpaper = {} as Wallpaper;

  image = this.wallpaper.fullUrl;

  ngOnInit(): void {
  }

}
