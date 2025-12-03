
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
<div class="container mt-4" style="max-width: 420px">
  <h2>Entrar por e-mail</h2>
  <form [formGroup]="form" (ngSubmit)="sendLink()">
    <div class="mb-3">
      <label>E-mail</label>
      <input type="email" class="form-control" formControlName="email">
    </div>
    <button class="btn btn-primary" type="submit" [disabled]="loading || form.invalid">
      Enviar link
    </button>
    <div class="text-success mt-3" *ngIf="message">{{ message }}</div>
    <div class="text-danger mt-3" *ngIf="error">{{ error }}</div>
  </form>
</div>
  `
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);

  form = this.fb.group({ email: ['', [Validators.required, Validators.email]] });
  loading = false;
  message = '';
  error = '';

  async sendLink() {
    if (this.form.invalid) return;
    this.loading = true; this.error = ''; this.message = '';
    try {
      await this.auth.sendMagicLink(this.form.value.email!);
      this.message = 'Verifique seu e-mail para o link de acesso.';
    } catch (err: any) {
      this.error = err.message ?? 'Erro ao enviar link.';
    } finally {
      this.loading = false;
    }
  }
}
