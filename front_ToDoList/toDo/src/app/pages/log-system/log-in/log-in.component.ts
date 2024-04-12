import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogServiceService } from '../../../services/log-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, catchError } from 'rxjs';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  subLogin!: Subscription;
  regPassword: string = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$";
  loginErrors: boolean = false;
  loginErrorsStr: string = '';

  constructor(
    private router: Router,
    private logSvc: LogServiceService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: this.fb.control('', Validators.required),
      password: this.fb.control('', [Validators.required, Validators.pattern(this.regPassword)])
    })
  }

  ngOnDestroy(): void {
    if(this.subLogin) this.subLogin.unsubscribe();
  }

  login() {
    this.subLogin = this.logSvc.login(this.form.value)
      .pipe(
        catchError(err => {
          if(err && err.error){
            this.loginErrors = true;
            this.loginErrorsStr = err.error.message;
          }
          throw err;
        }))
      .subscribe(() => {this.router.navigate(['/toDo'])})
  }

  inputHasError(inputName: string) {
    const input = this.form.get(inputName)
    if (input?.touched) {
      if (input.invalid) {
        return true
      } return false
    } else return false;
  }

}
