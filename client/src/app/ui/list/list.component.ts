import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  template: `<ul class="app-list"><ng-content /></ul>`,
  styleUrl: './list.component.scss',
})
export class ListComponent {}
