import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  database: firebase.database.Database = firebase.database();
  constructor() {}

  async signUp(email, password, name) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(async (data: any) => {
        localStorage.setItem('CREDENTIALS', JSON.stringify(firebase.auth().currentUser));
        localStorage.setItem('PASSWORD', password);
        return await this.database.ref('users/' + data.user.uid).set({
          nombre: name
        }).then(res => {
          localStorage.setItem('NAME', name);
          return true;
        }).catch(err => {
          return false;
        })
      }).catch(err => {
        if(err.code === 'auth/invalid-email') {
          alert('El formato del correo es inválido');
        }
        if(err.code === 'auth/weak-password') {
          alert('La contraseña debe contener al menos 6 caracteres')
        }
        return false;
    });
  }

  async signIn(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(async (data: any) => {
        localStorage.setItem('CREDENTIALS', JSON.stringify(firebase.auth().currentUser));
        localStorage.setItem('PASSWORD', password);
        return await this.database.ref('users/' + data.user.uid).once('value').then(value => {
          localStorage.setItem('NAME', value.val().nombre);
          return true;
        }, err => {
          console.log(err);
          return false
        });
      }).catch(err => {
        if(err.code === 'auth/invalid-email') {
          alert('El formato del correo es inválido');
        }
        if(err.code === 'auth/wrong-password') {
          alert('La contraseña es incorrecta')
        }
        return false;
      })
  }

  async logOut() {
    localStorage.removeItem('CREDENTIALS');
    localStorage.removeItem('NAME');
    return await firebase.auth().signOut();
  }
}
