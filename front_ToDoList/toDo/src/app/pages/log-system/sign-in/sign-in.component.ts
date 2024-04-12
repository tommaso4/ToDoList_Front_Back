import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { LogServiceService } from '../../../services/log-service.service';
import { Router } from '@angular/router';
import { Subscription, catchError } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  regPassword: string = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$";
  usernameExist: boolean = false;
  usernameErrStr: string = "";
  subRegister!: Subscription;

  constructor(
    private fb: FormBuilder,
    private logSvc: LogServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      surname: this.fb.control('', [Validators.required]),
      username: this.fb.control('', [Validators.required]),
      age: this.fb.control(undefined, [Validators.required]),
      password: this.fb.control('', [Validators.required, Validators.pattern(this.regPassword)]),
      password2: this.fb.control('', [Validators.required, this.matchPasswordValidator] as Validators)
    })
  }

  ngOnDestroy(): void {
    if(this.subRegister)   this.subRegister.unsubscribe();
  }

  register() {
    this.form.get('name')?.setValue(this.toUpperCaseFirstChart(this.form.get('name')?.value));
    this.form.get('surname')?.setValue(this.toUpperCaseFirstChart(this.form.get('username')?.value));
    delete this.form.value.password2;
    this.subRegister = this.logSvc.register(this.form.value).pipe(
      catchError(err => {
        console.log(err);
        this.usernameExist = true;
        this.usernameErrStr = err.error.message;
        throw err;
      })
    ).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/log-system/log-system/log-in']);
    })
  }

  toUpperCaseFirstChart(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }

  matchPasswordValidator = (formC: FormControl): ValidationErrors | null => {
    if (formC.value !== this.form?.get('password')?.value) {
      return {
        invalid: true,
      }
    } return null;
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
