import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
admin.initializeApp();

const db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const doneIt = functions.firestore.document('stock/{id}').onCreate((snapshot)=> {
    const time = Date.now();
    console.log(snapshot.data().prodUid);
    snapshot.ref.update({timeStamp: time}).catch((err) => { console.log(err)});
    db.doc('products/'+snapshot.data().prodUid).update({stock: snapshot.data().qty , beforePrice: snapshot.data().beforePrice , sellingPrice: snapshot.data().sellingPrice}).catch((err) => { console.log(err)})
    
})
/*https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});
*/