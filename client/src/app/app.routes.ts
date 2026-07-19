import { Routes } from '@angular/router';
import { Home } from '../pages/home/home';
import { Messages } from '../pages/messages/messages';
import { TrainingBuilder } from '../pages/training-builder/training-builder';

export const routes: Routes = [
  { path: '', component: Home, data: { title: 'Workouts' } },
  { path: 'training-builder', component: TrainingBuilder, data: { title: 'Training builder' } },
  { path: 'messages', component: Messages, data: { title: 'Messages' } },
  { path: '**', redirectTo: '' },
];
