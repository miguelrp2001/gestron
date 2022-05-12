import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable()
export class CanActivateAdmin implements CanActivate {
  constructor(private router: Router, private authservice: AuthService) {


  }

  login: boolean | UrlTree = false;


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authservice.isAdmin()) {
      return true;
    } else {
      const tree: UrlTree = this.router.parseUrl('/');
      return this.router.parseUrl('/');
    }
  }
}
