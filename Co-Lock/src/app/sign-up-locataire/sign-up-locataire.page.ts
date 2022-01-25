import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { DataService } from '../services/data.service';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-sign-up-locataire',
  templateUrl: './sign-up-locataire.page.html',
  styleUrls: ['./sign-up-locataire.page.scss'],
})
export class SignUpLocatairePage implements OnInit {

  name: string;
  surname: string;
  email: string;
  password: string;
  tel: string;
  state: 'propriétaire';
  essaieForm: FormGroup;
  mobile: string;
  type: string;

  constructor(
    public formBuilder: FormBuilder,
    public firestore: AngularFirestore,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    public auth: AngularFireAuth,
    public router: Router,
    private data: DataService,
    ) { }

  ngOnInit() {
    this.essaieForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      code: ['', [Validators.required, Validators.minLength(2)]],
      type: ['']
    });
    this.essaieForm.controls.type.setValue('L');

  }

  login(){
    const name = this.essaieForm.value.name;
    const prenom = this.essaieForm.value.prenom;
    const email = this.essaieForm.value.email;
    const mobile = this.essaieForm.value.mobile;
    const password = this.essaieForm.value.password;
    const code = this.essaieForm.value.code;
    const type = this.essaieForm.value.type;
    // eslint-disable-next-line max-len
    const photo = 'https://firebasestorage.googleapis.com/v0/b/co-lock-ba1fd.appspot.com/o/photoID%2Fprofil-l.png?alt=media&token=33dc739b-cf88-4dbf-94a7-a8f70a3f256c';
    // eslint-disable-next-line max-len
    const user = this.auth.createUserWithEmailAndPassword(email, password).then(cred => this.firestore.collection('users').doc(cred.user.uid).set({
      name,prenom,email,mobile,code,type,photo
    }));
    this.router.navigate(['/login']);
    return { user };
    }
};
