import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  isCollapsed = false;
  showMobileSidebar = false;
  ActiveRouting = "dashboed";
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    //this.activeRoutingService.activeRouteChanged.subscribe((res) => {
    //  if (this.showMobileSidebar) this.toggleMobileSidebar();
    //});
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleMobileSidebar() {
    this.showMobileSidebar = !this.showMobileSidebar;
  }

  isActive(id: string): boolean {
    return this.ActiveRouting === id;
  }
}
