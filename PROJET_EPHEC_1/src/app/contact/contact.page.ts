import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AngularFirestore } from "@angular/fire/firestore";
import { DataService} from "../services/data.service";




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
  defaultDate = '1987-06-30';
  isSubmitted = false;
  


  constructor(private firestore: AngularFirestore, public formBuilder: FormBuilder, private data: DataService) {
    
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

  ngOnInit() {
    this.essaieForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10)]]
    })
  }

  get errorControl() {
    return this.essaieForm.controls;
  }

}
