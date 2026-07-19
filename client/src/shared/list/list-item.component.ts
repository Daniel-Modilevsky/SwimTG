import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss',
})
export class ListItemComponent {
  image = input<string>('');
  title = input<string>('');
  subtitle = input<string>('');
  fallbackImage = input<string>('');

  protected src = signal('');

  ngOnInit() {
    this.src.set(this.image() || this.fallbackImage());
  }

  protected onImageError() {
    this.src.set(this.fallbackImage());
  }
}
