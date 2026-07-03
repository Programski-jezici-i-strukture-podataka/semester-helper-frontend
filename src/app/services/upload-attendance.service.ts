import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface StudentUploadResponse {
  message: string;
  updated: number;
  not_found: string[];
  invalid_rows: string[];
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private http = inject(HttpClient);
  private apiAttendanceUrl = `${environment.apiBaseUrl}/upload-attendance`;
  private apiStudentUrl = `${environment.apiBaseUrl}/upload-student`;
  private apiResultUrl = `${environment.apiBaseUrl}/upload-test-scores`;

  uploadAttendanceCsv(assistant: string, group: string, theme: string, file: File) {
    const formData = new FormData();
    formData.append('assistant', assistant);
    formData.append('group', group);
    formData.append('theme', theme);
    formData.append('file', file);

    return this.http.post(this.apiAttendanceUrl, formData);
  }

  uploadStudentCsv(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.apiStudentUrl, formData);
  }

  uploadResultCsv(test: string, file: File) {
    const formData = new FormData();
    formData.append('test', test);
    formData.append('file', file);

    return this.http.put<StudentUploadResponse>(this.apiResultUrl, formData);
  }
}