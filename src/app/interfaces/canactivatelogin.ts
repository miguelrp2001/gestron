import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class CanActivateLogin implements CanActivate {
  constructor(private router: Router, private tokenn: TokenService) {


  }

  login: boolean | UrlTree = false;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.tokenn.isLoggedIn()) {
      return true;
    } else {
      const tree: UrlTree = this.router.parseUrl('/login');
      return this.router.parseUrl('/login');
    }
  }

}
