import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from "@angular/fire/firestore";

import firebase from "firebase/app";
import 'firebase/auth';



@Component({
  selector: 'app-locataire',
  templateUrl: './locataire.page.html',
  styleUrls: ['./locataire.page.scss'],
})
export class LocatairePage implements OnInit {

    essaieForm: FormGroup;
    defaultDate = '1987-06-30';
    isSubmitted = false;
    users:any[];
  test:any[];
  age: number;
  address: string;
  name: string = "";
      email: string = "";
      mobile: string = "" ;

  constructor(public formBuilder: FormBuilder,private firestore: AngularFirestore, private data: DataService, private authService: AuthService,
    ) { }


    exec(){
        let user = firebase.auth().currentUser;    
        console.log(user);
        if (user) {
            console.log(this.firestore.collection("users").doc(user.uid));
        } else {
            alert('user not logged in');
        }
    }// je crois pas ca marche 

    piliP(){
      let user = firebase.auth().currentUser;  
      if (user){
        this.firestore.collection('users').doc(user.uid).get().toPromise().then(doc => {
          this.firestore.collection('users').valueChanges()
    .subscribe(response => {
      console.log(response);
    })
        })
      }  else {
        console.log('oula bassem ayed que fais tu ici');
      }// a tester for real

    }
  addData(){
    this.isSubmitted = true;
    if (!this.essaieForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      this.data.saveData(this.essaieForm.value.email,this.essaieForm.value.name,this.essaieForm.value.prenom, );   
      }
    }

  // envoyer les bails directe sans validation this.data.saveData(this.essaieForm.value.email,this.essaieForm.value.name,this.essaieForm.value.prenom, );


  ngOnInit() {
      
    this.essaieForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
    this.data.readTruc().subscribe(data => {

      this.users = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['name'],
          age: e.payload.doc.data()['age'],
          address: e.payload.doc.data()['address'],
        };
      })
      console.log(this.test);

    });// meme bail que dans contact 
  }

  public submitForm() {
    this.isSubmitted = true;
    if (!this.essaieForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      console.log(this.essaieForm.value);
    }
  }

  get errorControl() {
    return this.essaieForm.controls;

  }

}
