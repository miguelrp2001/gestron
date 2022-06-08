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
  actualizandoUsuarios: boolean = true;

  constructor(private gestronapi: GestronbackendService) {
    this.updateUsers();
  }

  updateUsers() {
    this.actualizandoUsuarios = true;
    this.gestronapi.allUsers().subscribe((res: GestronRequest) => {
      if (res.data.users) {
        this.usuarios = res.data.users;
        this.actualizandoUsuarios = false;
      }
    })

  }

  ngOnInit(): void {
  }

}


