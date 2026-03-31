import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiBaseUrl}/upload-attendance`;

  uploadCsv(assistant: string, group: string, theme: string, file: File) {
    const formData = new FormData();
    formData.append('assistant', assistant);
    formData.append('group', group);
    formData.append('theme', theme);
    formData.append('file', file);

    return this.http.post(this.apiUrl, formData);
  }
}