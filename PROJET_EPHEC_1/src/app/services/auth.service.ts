import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of, pipe } from "rxjs";
import { User } from '../models/user';
import { switchMap } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/firestore";







@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userId: string;
  user$: Observable<User>;
  user: User;

  constructor(private afAuth: AngularFireAuth,private firestore: AngularFirestore) {
    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
    })
   
   }// end constructor

   push(){
     if(!this.userId){
      console.log('ca marche pas c');
      
     } else {
      console.log('ca marche c');
     }
   }
  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }
  
  registerUser(value) {
    return new Promise<any>((resolve, reject) => {

      this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })

  }

 
  
} // fermeture export


