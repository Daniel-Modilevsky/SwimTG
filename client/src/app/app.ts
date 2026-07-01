import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from './intetfaces/users';
import { lastValueFrom } from 'rxjs';
import { ListComponent } from './ui/list/list.component';
import { ListItemComponent } from './ui/list/list-item.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ListComponent, ListItemComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected title = signal('client');
  private http = inject(HttpClient);
  protected users = signal<User[]>([]);
  protected readonly fallbackImage = '/profile-placeholder.svg';

  async ngOnInit() {
    this.users.set(await this.getUsers());
  }

  async getUsers(): Promise<User[]> {
    try {
      return await lastValueFrom(this.http.get<User[]>('https://localhost:5001/api/users'));
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}
