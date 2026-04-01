import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UploadService } from '../services/upload-attendance.service';

@Component({
  selector: 'app-upload-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './upload-page.component.html',
  styleUrl: './upload-page.component.css'
})
export class UploadPageComponent {
  private fb = inject(FormBuilder);
  private uploadService = inject(UploadService);

  selectedFile: File | null = null;
  loading = false;
  successMessage = '';
  errorMessage = '';

  form = this.fb.group({
    assistant: ['', Validators.required],
    group: ['', Validators.required],
    theme: ['', Validators.required]
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

    const { assistant, group, theme } = this.form.getRawValue();

    this.loading = true;

    this.uploadService
      .uploadCsv(
        assistant ?? '',
        group ?? '',
        theme ?? '',
        this.selectedFile
      )
      .subscribe({
        next: (response) => {
          console.log(response);
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