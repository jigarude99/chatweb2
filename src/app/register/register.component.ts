import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private builder: FormBuilder,
    private appService: AppService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  async register() {
    console.log(this.form);
    const data: any = await this.appService.signUp(this.form.get('email').value, this.form.get('password').value, this.form.get('name').value);
    console.log(data);
    if(data) {
      this.router.navigate(['/chat']);
    }
  }

}
