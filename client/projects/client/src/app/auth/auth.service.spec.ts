import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dummy',
  template: '<h1>Dummy</h1>'
})
class DummyComponent {}

describe('AuthService', () => {
  let httpTestingController: HttpTestingController;
  let service: AuthService;
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [DummyComponent],
    imports: [
      HttpClientTestingModule,
      RouterTestingModule.withRoutes(
        [{path: 'stocks/grid', component: DummyComponent},
        {path: 'login', component: DummyComponent}]
      )
    ],
    providers: [AuthService]
  }));

  beforeEach(() => {
    // We inject our service (which imports the HttpClient) and the Test Controller
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login the user and return user details', () => {
    const mockRespone = {
      userId: 'af224382940sdadfa989423',
      token: 'authtokensupersupersupersupersecretkey'
    };
    service.login('user@gmail.com', 'user123');
      // .subscribe(courseData => {
      //   expect(courseData.name).toEqual('Chessable');
      // });
    const req = httpTestingController.expectOne('http://localhost:8080/users/login');
    expect(req.request.method).toEqual('POST');
    req.flush(mockRespone);
  });

  it('should sign up user and navigate to login page', () => {
    const mockRespone = {
      userId: 'af224382940sdadfa989423',
      message: 'Registration successful!'
    };
    service.signup('user', 'user@gmail.com', 'user123');
    const req = httpTestingController.expectOne('http://localhost:8080/users/signup');
    expect(req.request.method).toEqual('POST');
    req.flush(mockRespone);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
