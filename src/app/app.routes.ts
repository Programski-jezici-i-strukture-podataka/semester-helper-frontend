import { Routes } from '@angular/router';
import { UploadAttendanceComponent } from './pages/upload-attendance.component';
import { UploadStudentComponent } from './pages/upload-student.component';
import { UploadResultComponent } from './pages/upload-result.component';

export const routes: Routes = [
  { path: '', redirectTo: 'upload-attendance', pathMatch: 'full' },
  { path: 'upload-attendance', component: UploadAttendanceComponent },
  { path: 'upload-student', component: UploadStudentComponent },
  { path: 'upload-result', component: UploadResultComponent },
  { path: '**', redirectTo: 'upload-attendance' }
];