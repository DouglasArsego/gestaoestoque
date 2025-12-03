
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="container mt-4"><h4>Processando login...</h4></div>`
})
export class AuthCallbackComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);

  async ngOnInit() {
    const session = await this.auth.getSession();
    if (session) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
}
