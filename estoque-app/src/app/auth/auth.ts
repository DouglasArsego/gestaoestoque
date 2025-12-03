import { Injectable } from '@angular/core';
import { supabase } from '../supabase.client';

@Injectable({ providedIn: 'root' })
export class AuthService {
  async sendMagicLink(email: string) {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin + '/auth/callback' }
    });
    if (error) throw error;
  }

  async getSession() {
    const { data } = await supabase.auth.getSession();
    return data.session ?? null;
  }

  async getUser() {
    const { data } = await supabase.auth.getUser();
    return data.user ?? null;
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }
}
