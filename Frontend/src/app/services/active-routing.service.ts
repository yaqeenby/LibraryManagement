import { Injectable, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveRouting } from '../enums/active-routing.enum';
import { MenuItem } from '../models/menu-item';

@Injectable({
  providedIn: 'root',
})
export class ActiveRoutingService {
  activeRouteChanged: EventEmitter<any> = new EventEmitter<any>();
  activeRoute: ActiveRouting = ActiveRouting.Books;
  activeRouteIcon: string = 'library_books';

  routes: MenuItem[] = [
    //{
    //  id: ActiveRouting.Dashboard,
    //  label: 'Dashboard',
    //  icon: 'dashboard',
    //  route: '/dashboard'
    //},
    {
      id: ActiveRouting.Books,
      label: 'Books',
      icon: 'library_books',
      route: '/books'
    },
    {
      id: ActiveRouting.Categories,
      label: 'Categories',
      icon: 'folder_open',
      route: '/categories'
    }
  ];

  constructor(private router: Router, private route: ActivatedRoute) { }

  setActiveRoute(activeRoute: ActiveRouting, navigate: boolean = true) {
    this.activeRoute = activeRoute;
    this.activeRouteChanged.emit(this.activeRoute);

    let route = this.routes.find(r => r.id == activeRoute);
    if (route) {
      this.activeRouteIcon = route.icon;

      if (navigate) {
        this.router.navigate([route.route]);
      }
    }
  }
}
