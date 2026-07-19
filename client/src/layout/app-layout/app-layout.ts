import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { Header } from '../header/header';
import { NavigationSidebar } from '../navigation-sidebar/navigation-sidebar';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, NavigationSidebar, Header],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.scss',
})
export class AppLayout {
  private router = inject(Router);

  protected isMenuOpen = signal(false);
  protected pageTitle = signal(this.resolveTitle());

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.pageTitle.set(this.resolveTitle());
        this.closeMenu();
      });
  }

  protected toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  private resolveTitle(): string {
    let route = this.router.routerState.snapshot.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return (route.data['title'] as string) ?? '';
  }
}
