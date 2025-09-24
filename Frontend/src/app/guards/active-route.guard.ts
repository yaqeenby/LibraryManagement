import { Injectable } from '@angular/core';
import { CanMatch, Route, UrlSegment } from '@angular/router';
import { ActiveRoutingService } from '../services/active-routing.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActiveRouteGuard implements CanMatch {
  constructor(private activeRoutingService: ActiveRoutingService) { }

  canMatch(
    route: Route,
    segments: UrlSegment[]
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (route.data && route.data['activeRoute']) {
      this.activeRoutingService.setActiveRoute(route.data['activeRoute']);
    }
    return true;
  }
}
