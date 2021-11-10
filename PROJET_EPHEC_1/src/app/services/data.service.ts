import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";


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
  }
  saveData(email, name, prenom) {
    return this.firestore.collection('testo')
      .add({ email, name, prenom });
  }
  

  public addinfo(){
    let defaultinfo = {
      name: "bonjour",
    }
    return this.firestore.collection('test').add(defaultinfo);
  }
  public addinformation(){
    let defaultinfo = {
      name: this.makeid(7),
    }
    return this.firestore.collection('test').add(defaultinfo);
  }

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
