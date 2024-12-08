import { inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpHandlerFn } from '@angular/common/http';
import { AuthService } from './services/auth/auth.service';

export function AuthInterceptor(req: HttpRequest<any>, next: HttpHandlerFn) {
    const token = inject(AuthService).getToken();
    
    const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(cloned);
}
