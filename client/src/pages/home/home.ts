import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../../intetfaces/users';
import { ListComponent } from '../../shared/list/list.component';
import { ListItemComponent } from '../../shared/list/list-item.component';

@Component({
  selector: 'app-home',
  imports: [ListComponent, ListItemComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
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
