import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MessageService,ConfirmationService  } from 'primeng/api';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }), 
        provideRouter(routes), 
        provideHttpClient(
            withInterceptors([
                AuthInterceptor
            ])
        ), provideAnimationsAsync(),
        ConfirmationService ,
        MessageService
    ]
};
