import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

export interface tab {
  'name': string;
  'link': string;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {

  links: tab[] = [{ 'name': 'Usuarios', 'link': '/admin' }, { 'name': 'Centros', 'link': '/admin/centros' }];
  activeLinkIndex: number = -1;

  activateLink(index: number, linkIsActivated: boolean) {
    this.activeLinkIndex = index;
    console.log(linkIsActivated);
  }

  background: ThemePalette = 'primary';

  toggleBackground() {
    this.background = this.background ? undefined : 'primary';
  }

  public rlaSafe: boolean = false;

  public ngAfterViewInit() {
    this.rlaSafe = true;
  }

  constructor() { }

  ngOnInit(): void {
    this.activeLinkIndex = 0;
  }

}
