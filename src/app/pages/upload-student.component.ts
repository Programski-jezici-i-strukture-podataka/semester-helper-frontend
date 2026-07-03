import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule } from '@angular/forms';
import { UploadService } from '../services/upload-attendance.service';

@Component({
  selector: 'app-upload-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload-student.component.html',
  styleUrl: './upload-attendance.component.css'
})
export class UploadStudentComponent {
  private fb = inject(FormBuilder);
  private uploadService = inject(UploadService);

  selectedFile: File | null = null;
  loading = false;
  successMessage = '';
  errorMessage = '';

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    if (file && !file.name.toLowerCase().endsWith('.csv')) {
      this.selectedFile = null;
      this.errorMessage = 'Izaberite datoteku sa ekstenzijom CSV.';
      return;
    }

    this.selectedFile = file;
    this.errorMessage = '';
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.selectedFile) {
      this.errorMessage = 'Izabrati CSV datoteku.';
      return;
    }

    this.loading = true;

    this.uploadService
      .uploadStudentCsv(
        this.selectedFile
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.successMessage = 'Slanje uspešno.';
          this.loading = false;
          this.selectedFile = null;
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = err?.error?.detail || 'Slanje neuspešno.';
          this.loading = false;
        }
      });
  }
}