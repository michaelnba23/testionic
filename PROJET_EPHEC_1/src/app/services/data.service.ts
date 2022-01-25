import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import firebase from 'firebase/compat/app';


export interface Resto {
  name: string;
  campaigns: [];
  type: string;
  address: string;
  city: string;
  zip: string;
  timestamp: Date;
  deleted: boolean;
  takeaway?: string;
  deliveroo?: string;
  uber?: string;
}

@Injectable({
  providedIn: "root",
})
export class DataService {
  

  constructor(private firestore: AngularFirestore) {}


  readBail(){
    return this.firestore.collection('test').snapshotChanges();

  }// renvoi l'etat de la BDD a tester pas sur 
  readTruc(){
    return this.firestore.collection('users').snapshotChanges();

  }
  

  public makeid(arg0: number) {
    return 7;
  }



  
  public getRestoByKey(key) {
    return this.firestore
      .collection("restaurants")
      .doc(key)
      .valueChanges({ idField: "id" });
  }


  saveSong(email, name, mobile) {
    return this.firestore.collection('test')
      .add({ email, name, mobile });
  }// enregistre champs dans firebase lien dans page contact mais genere l'id random 
  saveData(email, name, prenom) {
    return this.firestore.collection('users')
      .add({ email, name, prenom });
  }
  

  public addinfo(){
    let defaultinfo = {
      name: "bonjour",
    }
    return this.firestore.collection('test').add(defaultinfo);
  }// blc 
  public addinformation(){
    let defaultinfo = {
      name: this.makeid(7),
    }
    return this.firestore.collection('test').add(defaultinfo);
  }//blc lien contact envoyer nbr

  public addRestaurant() {
    let defaultRestaurant = {
      address: this.makeid(20),
      type: this.makeid(5),
      name: this.makeid(5),
      city: this.makeid(10),
      zip: this.makeid(4),
      deleted: false,
    }
    return this.firestore.collection("test").add(defaultRestaurant)
  }
  ptsh(){// methode qui permet de verifier si le bail est bien la et renvoin l'id du document
    firebase.firestore().collection('users')
      .where('code', '==', '32123').where('type', '==', 'P')
      .get()
      .then(querySnapshot => { if (querySnapshot.size === 1) {
        const snap = querySnapshot.docs[0];
        console.log(snap.ref.id);
    }
    else {
        console.log('query result in exactly one document');
    } });
  }

  public getRestos(): Observable<Resto[]> {
    return this.firestore
      .collection<Resto>("restaurants", (ref) =>
        ref
          .where("deleted", "==", false)
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Resto;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );

  }
}
