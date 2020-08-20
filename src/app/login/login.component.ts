import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  async login() {
    const data: any = await this.appService.signIn(this.form.get('email').value, this.form.get('password').value);
    if(data) {
      this.router.navigate(['/chat']);
    }
  }

}
