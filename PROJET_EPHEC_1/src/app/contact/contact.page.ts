import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AngularFirestore } from "@angular/fire/firestore";
import { DataService} from "../services/data.service";
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';


import { AngularFireAuth } from '@angular/fire/auth';
import firebase from "firebase/app";
import 'firebase/auth';







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
  users:any[];
  test:any[];
  age: number;
  address: string;



  


  constructor(private firestore: AngularFirestore,
     public formBuilder: FormBuilder, private data: DataService, 
     private authService: AuthService,
     private navCtrl: NavController,private afAuth: AngularFireAuth,
     
    ) {
    }

    exec(){
      {
        let user = firebase.auth().currentUser;    
        console.log(user);
        if (user) {
            console.log(this.firestore.collection("users").doc(user.uid))
        } else {
            alert('user not logged in')
        }
    };
    }
    async addMike(){ // ca ajoute un bien dans la collec biens et ca ajoute aussi l'uid dans les champs 
      const user = await firebase.auth().currentUser;
      const moi = user.uid;
      const pom = this.essaieForm.value.name;// pour ajouter les champs du formulaire faire ca avec chaque 
      this.firestore.collection('biens').add({
        moi,pom,
      });

      console.log('ca marche');
    }

addSong(){
  this.data.saveSong(this.essaieForm.value.email,this.essaieForm.value.name,this.essaieForm.value.mobile, );
}
async signUp({email, password}){
const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
console.log('result: ', credential);
const uid = credential.user.uid;
const name = credential.user.displayName;

return this.firestore.doc(`users/${uid}`).set({
  uid, email: credential.user.email,name: credential.user.displayName
})
}

addinformation() {
  this.data.addinformation();
} // en lien avec data service, sert a ajouter un nbr random dans la collection test en donnant un id random pas utile


jspTrop(){
  let user = firebase.auth().currentUser;    

  this.firestore.collection('users').doc(user.uid).ref/*pas-ref-mais-topromise?*/.get().then(function (doc) { // jusqu'a avant le ref a reutiliser imo
    if (doc.exists) {
      console.log(doc.data());// ca ca montre que les données du type connecter 
    } else {
      console.log("There is no document!");
      alert('user not logged in');

    }
  })
} // qui sert a recuper les donner de la personne qui est connceter et que ses données a lui, nice


signOut(){
  return new Promise((resolve, reject) => {
    if (this.afAuth.currentUser) {
      this.afAuth.signOut()
        .then(() => {
          console.log("LOG Out");
          this.navCtrl.navigateForward('/home');
          
        }).catch((error) => {
          reject();
        });
    }
  })
}// se deconnecter de l'app avec un renvoi vers la page home

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
}//login que j'utilise tjr ca avance vers la page + les erreurs
onVeut(value){
  var user = this.afAuth.createUserWithEmailAndPassword(value.email, value.password).then(cred => {
    return this.firestore.collection('users').doc(cred.user.uid).set(value)
    })
    return { user }
}//bail qui creer un document dans la collection users avec l'uid et qui creer un user MAIS ca enregistre le mot de passe donc mzi
onPrend(){
  this.firestore.collection('test').valueChanges()
    .subscribe(response => {
      console.log(response);
    })
}// prendre toutes les valeurs dans la collection users dommage 
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
}//cree un compte mais pas interressant sauf pour les erreurs et messages nice

  ngOnInit() {
    this.essaieForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(5)]]

    })
    if (firebase.auth().currentUser !== null) 
        console.log("user id: " + firebase.auth().currentUser.uid);// qd on arrive sur la page contact connecter ca montre dans la console qui est la avec l'uid

    this.data.readBail().subscribe(data => {

      this.test = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['name'],
          age: e.payload.doc.data()['age'],
          address: e.payload.doc.data()['address'],
        };
      })
      console.log(this.test);

    });// renvoie trucs de la collection users en lien avec data service et ca store les trucs dans la page contact dynamiquement mais ca reprend tout, a ameliorer
    
  }//ng on init fin 

  get errorControl() {
    return this.essaieForm.controls;
  }// avoir les erreurs de formulaire tu connais 

}
