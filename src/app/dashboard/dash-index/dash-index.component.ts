import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/services/auth-state.service';
import { AuthService } from '../../services/auth.service';
import { GestronRequest, User } from '../../interfaces/user';

@Component({
  selector: 'app-dash-index',
  templateUrl: './dash-index.component.html',
  styleUrls: ['./dash-index.component.css']
})
export class DashIndexComponent implements OnInit {

  constructor(private authState: AuthStateService, private router: Router, private authService: AuthService) {

    this.authState.userAuthState.subscribe(r => {
      if (!r) {
        this.router.navigate(['login']);
      }
    })

  }


  public user(): User {
    return this.authService.getUsuario();
  }

  ngOnInit(): void {
  }




}
