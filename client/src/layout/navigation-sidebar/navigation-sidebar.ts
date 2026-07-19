import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigation-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation-sidebar.html',
  styleUrl: './navigation-sidebar.scss',
})
export class NavigationSidebar {
  isOpen = input<boolean>(false);
  closeMenu = output<void>();
}
