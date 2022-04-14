import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthStateService } from 'src/app/services/auth-state.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dash-index',
  templateUrl: './dash-index.component.html',
  styleUrls: ['./dash-index.component.css']
})
export class DashIndexComponent implements OnInit {

  user: User = {} as User;

  constructor(private authState: AuthStateService, private router: Router, private authService: AuthService) {

    this.authState.userAuthState.subscribe(r => {
      if (!r) {
        this.router.navigate(['login']);
      } else {
        this.authService.profile().subscribe((res: User) => {
          this.user = res;
        })
      }
    })

  }

  ngOnInit(): void {
  }

}
