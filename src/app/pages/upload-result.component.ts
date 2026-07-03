import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentUploadResponse, UploadService } from '../services/upload-attendance.service';

@Component({
  selector: 'app-upload-attendance',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './upload-result.component.html',
  styleUrl: './upload-attendance.component.css'
})
export class UploadResultComponent {
  private fb = inject(FormBuilder);
  private uploadService = inject(UploadService);

  selectedFile: File | null = null;
  uploadResult: StudentUploadResponse | null = null;
  loading = false;
  successMessage = '';
  errorMessage = '';

  form = this.fb.group({
    test: ['', Validators.required],
  });

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

    if (this.form.invalid || !this.selectedFile) {
      this.errorMessage = 'Popuniti sva polja i izabrati CSV datoteku.';
      return;
    }

    const test = this.form.value.test;

    this.loading = true;

    this.uploadService
      .uploadResultCsv(
        test ?? '',
        this.selectedFile
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.uploadResult = response;
          this.successMessage = 'Slanje uspešno.';
          this.loading = false;
          this.form.reset();
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