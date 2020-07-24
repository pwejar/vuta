import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ServemeService {
  cart: any[] = [];
  prod: any;
  loadingIt: any;
  photo: any;
  categories: string[] = ['Rolling Papers', 'Charlices', 'Electric Accessories', 'Tools and Equipment', 'Health'];
  templete: [{
    uID: '834874754',
    name: 'Philips SHe werew Headphone',
    brand: 'philips',
    oldPrice: '',
    newPrice: '',
    pictures: ['/assets/a1.jpg', '/assets/a2.jpg', '/assets/a5.jpg'],
    details: 'Its all about the bass! Nothing beats the Philips SHE1350/00 earbud headphones when it comes to the bass sound. Designed with rubberized caps for comfort listening and sensitive microphones for easy control while talking on your mobile phone. Order for this Philips SHE1350/00 online from Jumia Kenya and have it delivered right to your doorstep.',
    keyFeatures: ['Bass beat vents allow air movement for better sound with a deep rich bass', 'Frequency Response: 16 to 20000 hertz.'],
    inTheBox: ['Earbud Headphone (SHE1350/00) - Black', 'grinder'],
    specification: [{speck: 'Ram', detailSp: '34gb'}]
  }];

  constructor(
    public angularFireAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    private navMe: NavController,
    private loadingController: LoadingController,
    private firestore: AngularFirestore
  ) {
    this.angularFireAuth.authState.subscribe(userResponse => {
      if (userResponse) {
        localStorage.setItem('user', JSON.stringify(userResponse));
        this.photo = this.isUserLoggedIn().photoURL;
      } else {
        localStorage.setItem('user', null);
        const thiss = document.getElementById('containerMain');
        thiss.style.display = 'grid';
      }
    });
  }
  read_products(collection){
    return this.firestore.collection(collection, ref => ref.limit(12)).snapshotChanges();
  }
  orderSales(collection, unit, searchTearm, limit) {
    return this.firestore.collection(collection, ref => ref.where(unit, '==', searchTearm).limit(limit)).snapshotChanges();
  }
  async creatNewProd(prod, catego) {
    return await this.firestore.collection(catego).add(prod);
  }
  async login(email: string, password: string) {
    this.loading();
    return await this.angularFireAuth.signInWithEmailAndPassword(email, password).then(() => {
      this.loadingIt.dismiss();
      const dree = document.getElementById('containerMain');
      dree.style.display = 'none';
    }).catch(err => {
      this.loadingIt.dismiss();
      this.showAlert(err.message, 3);
    });
  }

  async register(email: string, password: string) {
    this.loading();
    return await this.angularFireAuth.createUserWithEmailAndPassword(email, password).then(() => {
      this.loadingIt.dismiss();
      const dree = document.getElementById('containerMain');
      dree.style.display = 'none';
    }).catch(err => {
      this.loadingIt.dismiss();
      this.showAlert(err.message, 3);
    });
  }

  async sendEmailVerification() {
    return await (await this.angularFireAuth.currentUser).sendEmailVerification();
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    this.loading();
    return await this.angularFireAuth.sendPasswordResetEmail(passwordResetEmail).then(() => {
      this.loadingIt.dismiss();
      this.showAlert('Kindly Check Your Email', 3);
    }).catch(err => {
      this.loadingIt.dismiss();
      this.showAlert(err.message, 3);
    });
  }

  async logout() {
    return await this.angularFireAuth.signOut();
  }
  isUserLoggedIn() {
    return JSON.parse(localStorage.getItem('user'));
  }
  async  loginWithGoogle() {
    return await this.angularFireAuth.signInWithPopup(new auth.GoogleAuthProvider()).then(() => {
      const dree = document.getElementById('containerMain');
      dree.style.display = 'none';
    }).catch(err => {
      this.showAlert(err.message, 3);
    });
  }
  async showAlert(ujumbe: string, sec: number) {
    const alert = await this.alertCtrl.create({
      message: ujumbe
    });
    alert.present();
    setTimeout(() => alert.dismiss(), 1000 * sec);

  }
  async loading() {
    this.loadingIt = await this.loadingController.create({
      message: 'Please wait...',
      duration: 8000
    });

    await this.loadingIt.present();
  }
}
