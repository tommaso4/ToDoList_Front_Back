import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit {

  form!: FormGroup;
  constructor(
    private   fb: FormBuilder
  ){}


  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.fb.control(null,[Validators.required])
    })
  }
}
