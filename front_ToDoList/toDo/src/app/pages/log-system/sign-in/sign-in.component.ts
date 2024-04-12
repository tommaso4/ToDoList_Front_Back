import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit {

  form!: FormGroup;
  regPassword: string = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"

  constructor(
    private fb: FormBuilder
  ) {
  }

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

  save() {
    console.log(this.form.value);
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
    if(input?.touched){
      if(input.invalid){
        return true
      } return false
    }else return false;
  }
}
