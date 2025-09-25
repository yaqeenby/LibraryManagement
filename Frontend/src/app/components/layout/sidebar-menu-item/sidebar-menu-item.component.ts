import { Component, Input } from '@angular/core';
import { ActiveRoutingService } from '../../../services/active-routing.service';
import { MenuItem } from '../../../models/menu-item';

@Component({
  selector: 'app-sidebar-menu-item',
  templateUrl: './sidebar-menu-item.component.html',
  styleUrl: './sidebar-menu-item.component.scss',
  standalone: false
})
export class SidebarMenuItemComponent {
  @Input() variant: 'big' | 'small' | 'mobile' | 'shortcut' = 'big';
  @Input() item: MenuItem | undefined;
  @Input() selected: boolean = false;
  constructor(
    public activeRoutingService: ActiveRoutingService
  ) { }

  onClickItem() {
    if (this.item)
      this.activeRoutingService.setActiveRoute(this.item.id);
  }
}
