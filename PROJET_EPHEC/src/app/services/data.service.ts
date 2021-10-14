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
    return 5;
  }
  
  public getRestoByKey(key) {
    return this.firestore
      .collection("restaurants")
      .doc(key)
      .valueChanges({ idField: "id" });
  }

  public addinfo(){
    let defaultinfo = {
      name: this.makeid(5),
    }
    return this.firestore.collection('test').add(defaultinfo);
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
