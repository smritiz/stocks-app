import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../service/error-handler.service';

@Injectable()
export class AuthService {

  endPoint = environment.apiEndPoint;
  constructor(
    private http: HttpClient,
    private router: Router,
    private errorHandlerService: ErrorHandlerService
  ) { }

  signup(name: string, email: string, password: string) {
    const data = { name, email, password };
    this.http.post(this.endPoint + '/users/signup', data)
      .subscribe(response => {
        this.router.navigate(['/login']);
      }, err => {
        this.errorHandlerService.errorEmmitter.next({ message: err.error.errors[0].msg, type: 'error'});
      });
  }

  login(email: string, password: string) {
    const data = { email, password };
    this.http.post<{ token: string, userId: string }>(this.endPoint + '/users/login', data)
      .subscribe(response => {
        this.setToken(response.token, response.userId);
        this.router.navigate(['/stocks/grid']);
      }, err => {
        console.log(err);
        this.errorHandlerService.errorEmmitter.next({ message: err.error.message, type: 'error'});
      });
  }

  logout() {
    localStorage.removeItem('access-token');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

  setToken(token: string, userId: string) {
    localStorage.setItem('access-token', token);
    localStorage.setItem('userId', userId);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access-token');
    if (!token) {
      return false;
    }
    return true;
  }

  showError (message: string) {
      this.errorHandlerService.errorEmmitter.next({
        type: 'error',
        message: message
      });
  }
}
