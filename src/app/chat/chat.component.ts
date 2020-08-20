import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  nombre = '';

  constructor(
    private appService: AppService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let user: any = localStorage.getItem('CREDENTIALS');
    if(!user) {
      this.router.navigate(['']);
    }
    console.log(firebase.auth().currentUser)
    this.nombre = localStorage.getItem('NAME');
  }

  async logOut() {
    await this.appService.logOut();
    this.router.navigate([''])
  }

  buscar() {

  }

}
