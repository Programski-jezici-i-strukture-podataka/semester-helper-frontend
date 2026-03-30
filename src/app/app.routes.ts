import { Routes } from '@angular/router';
import { UploadPageComponent } from './pages/upload-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'upload', pathMatch: 'full' },
  { path: 'upload', component: UploadPageComponent },
  { path: '**', redirectTo: 'upload' }
];