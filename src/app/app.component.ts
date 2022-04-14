import { Component } from '@angular/core';
import { TokenService } from './services/token.service';
import { AuthStateService } from './services/auth-state.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestron';

  constructor(private authService: AuthService, private token: TokenService, private authState: AuthStateService) {

  }

  sesionIniciada() {
    return this.authState.userAuthState;
  }
}
