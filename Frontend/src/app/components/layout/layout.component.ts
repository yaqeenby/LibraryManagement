import { Component } from '@angular/core';
import { ActiveRoutingService } from '../../services/active-routing.service';
import { ActiveRouting } from '../../enums/active-routing.enum';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: false
})
export class LayoutComponent {
  isCollapsed = false;
  showMobileSidebar = false;
  ActiveRouting = ActiveRouting;
  constructor(
    public activeRoutingService: ActiveRoutingService
  ) { }

  ngOnInit(): void {
    this.activeRoutingService.activeRouteChanged.subscribe((res) => {
      if (this.showMobileSidebar) this.toggleMobileSidebar();
    });
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleMobileSidebar() {
    this.showMobileSidebar = !this.showMobileSidebar;
  }

  isActive(id: string): boolean {
    return this.activeRoutingService.activeRoute === id;
  }
}
