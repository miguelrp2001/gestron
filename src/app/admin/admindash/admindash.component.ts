import { Component, OnInit } from '@angular/core';
import { User, GestronRequest } from '../../interfaces/user';
import { GestronbackendService } from '../../services/gestronbackend.service';

@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.component.html',
  styleUrls: ['./admindash.component.css']
})
export class AdmindashComponent implements OnInit {

  usuarios: User[] = [];

  constructor(private gestronapi: GestronbackendService) {
    this.updateUsers();
  }

  updateUsers() {
    this.gestronapi.allUsers().subscribe((res: GestronRequest) => {
      if (res.data.users) {
        this.usuarios = res.data.users;
      }
    })

  }

  ngOnInit(): void {
  }

}


