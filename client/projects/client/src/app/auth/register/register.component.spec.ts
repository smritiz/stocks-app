import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [AuthService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call auth signup method', async(() => {
    let loginElement: DebugElement;
    const debugElement = fixture.debugElement;
    authService = debugElement.injector.get(AuthService);
    let signupSpy = spyOn(authService , 'signup').and.callThrough();
    loginElement = fixture.debugElement.query(By.css('form'));
    // to set values
    component.signupForm.controls['name'].setValue('user');
    component.signupForm.controls['email'].setValue('user@gmail.com');
    component.signupForm.controls['password'].setValue('user123');
    component.signupForm.controls['confirmPassword'].setValue('user123');
    loginElement.triggerEventHandler('ngSubmit', null);
    expect(signupSpy).toHaveBeenCalledTimes(1);
   }));
});
