import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AngularFirestore } from "@angular/fire/firestore";
import { DataService} from "../services/data.service";
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { userInfo } from 'os';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';






@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})

export class ContactPage implements OnInit {
  essaieForm: FormGroup;
  name: string = "";
      email: string = "";
      mobile: string = "" ;
      password: string = "";
  defaultDate = '1987-06-30';
  isSubmitted = false;
  errorMessage: string = '';
  successMessage: string = '';
  test1: number = 50;

  


  constructor(private firestore: AngularFirestore,
     public formBuilder: FormBuilder, private data: DataService, 
     private authService: AuthService,
     private navCtrl: NavController,private afAuth: AngularFireAuth,
     
    ) {
    
}
pipi(){
   this.authService.push;
}

addSong(){
  this.data.saveSong(this.essaieForm.value.email,this.essaieForm.value.name,this.essaieForm.value.mobile, );
}

addinformation() {
  this.data.addinformation();
}
public submitForm() {
  this.isSubmitted = true;
  if (!this.essaieForm.valid) {
    console.log('Please provide all the required values!')
    return false;
  } else {
    console.log(this.essaieForm.value)
  }
}
loginUser(value) {
  this.authService.loginUser(value)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.navCtrl.navigateForward('/locataire');
      
    }, err => {
      this.errorMessage = err.message;
    })
}
onVeut(value){
  var user = this.afAuth.createUserWithEmailAndPassword(value.email, value.password).then(cred => {
    return this.firestore.collection('users').doc(cred.user.uid).set({ 
      value
      })
    })
    return { user }
}
tryRegister(value) {
  this.authService.registerUser(value)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.successMessage = "Your account has been created. Please log in.";
      this.navCtrl.navigateForward('/locataire');
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = "";
    })
}

  ngOnInit() {
    this.essaieForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(5)]]

    })
  }

  get errorControl() {
    return this.essaieForm.controls;
  }

}
