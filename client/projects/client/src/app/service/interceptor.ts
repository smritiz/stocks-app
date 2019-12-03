import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (localStorage.getItem('access-token') != null) {
            const token = localStorage.getItem('access-token');
            // if the token is  stored in localstorage add it to http header
            // const headers = new HttpHeaders().set('Authorization', token);
            // clone http to the custom AuthRequest and send it to the server
            const AuthRequest = request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${token}`
                }
           });
           console.log(AuthRequest);
            return next.handle(AuthRequest);
        } else {
            return next.handle(request);
        }

    }
}
