
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';


bootstrapApplication(App, {
  providers: [
    provideRouter(routes), 
    provideHttpClient(), 
    importProvidersFrom(FormsModule)
  ]
});
