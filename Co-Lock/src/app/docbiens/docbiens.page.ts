/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular/';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { DataService } from '../services/data.service';
import { getStorage, ref } from 'firebase/storage';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router} from '@angular/router';



@Component({
  selector: 'app-docbiens',
  templateUrl: './docbiens.page.html',
  styleUrls: ['./docbiens.page.scss'],
})

export class DocbiensPage implements OnInit {

  @Input() imageUpload: any;

  docs: Observable<any[]>;
  firebaseData = {
    name: '',
    description: '',
    doc: ''
  };
  essaieForm: FormGroup;
  activatedRoute: any;


  constructor(
    public firestore: AngularFirestore,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    public alertController: AlertController,
    public formBuilder: FormBuilder,
    private dataService: DataService,
    private storage: AngularFireStorage,
    public router: Router,
  ) {
    this.docs = this.firestore.collection('documents').valueChanges();
  }

  url = '';
  barStatus = false;
  imageUploads = [];
  isSubmitted = false;

  ngOnInit(){
    this.essaieForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      doc: ['', [Validators.required]],
      });
  }

  get errorControl() {
    return this.essaieForm.controls;
  }

  async presentNegative() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Oops !',
      message: 'Vous avez oublié certains champs obligatoires !',
      buttons: ['Continuer']
    });

    await alert.present();
  };
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Document ajouté !',
      message: 'Votre document à correctement été ajouté.',
      buttons: [
        { text: 'OK',
          handler: () => {
            this.router.navigate(['./monbien/'+ this.dataService.docId]);
      }
  },]
    });
    await alert.present();
  }


  async addMike(){ // ca ajoute un bien dans la collec biens et ca ajoute aussi l'uid dans les champs
    this.isSubmitted = true;
    const user = await firebase.auth().currentUser;
    const spaceRef = this.dataService.fileName;
    const moi = user.uid;
    const name = this.essaieForm.value.name;
    const description = this.essaieForm.value.description;
    const url = this.url;
    const idBien = this.dataService.docId;
    if (!this.essaieForm.valid) {
      console.log('manques des champs la!');
      this.presentNegative();
      return false;
    } else {
      console.log('ca marche');
      this.presentAlert();
      this.firestore.collection('documents').add({
        moi,
        name,
        description,
        spaceRef,
        url,
        idBien
      });
    }


    console.log('ca marche');
  }

  ///////////////

  uploadPhoto(event) {
    this.barStatus = true;
    this.dataService.storeImage(event.target.files[0]).then(
        (res: any) => {
            if (res) {
                this.url = res;
                this.imageUploads.unshift(res);
                this.barStatus = false;
        }
    },
    (error: any) => {
        this.barStatus = false;
    }
    );
    }

  ///////////////

}
