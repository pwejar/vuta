import { Component, OnInit } from '@angular/core';
import { ServemeService } from '../service/serveme.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  prod: any;
  theUID: string;
  constructor(
    private serveMe: ServemeService,
    private firestore: AngularFirestore,
    private router: Router,
    private routLink: NavController,
    private alerCT: AlertController
  ) {

      console.log(this.router.url);
      this.theUID = this.router.url.split('/')[this.router.url.split('/').length - 1];
      this.firestore.collection('products').doc(this.theUID).ref.get().then((doc) => {
      if (doc.exists) {
        this.prod = doc.data();
        console.log(this.prod)
      } else {
        this.routLink.navigateBack('/home');
      }
    }).catch((error) => {
      this.serveMe.showAlert('There was an error getting your document:',3)
      console.log('There was an error getting your document:', error);
      this.routLink.navigateBack('/home');
    });
    }


  ngOnInit() {

  }
  async addStock() {
    const alert = await this.alerCT.create({
      header: 'Add Stock!',
      inputs: [
        {
          name: 'Supplyer',
          type: 'url',
          placeholder: 'Supplyer'
        },
        {
          name: 'qty',
          type: 'number',
          min: 1,
          placeholder: 'Quantity*'
        },
        {
          name: 'costOfEach',
          type: 'number',
          min: 1,
          placeholder: 'Cost of @*'
        },
        {
          name: 'sellingPrice',
          type: 'number',
          min: 1,
          placeholder: 'Selling Price of @*'
        },
        {
          name: 'beforePrice',
          type: 'number',
          min: 1,
          placeholder: 'Before discount Price'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Add Stock',
          handler: (data) => {
            if (!data.qty) {
              this.addStock();
              return this.serveMe.showAlert('Kindly insert the Quantity', 3);
            }
            if (!data.costOfEach) {
              this.addStock();
              return this.serveMe.showAlert('Kindly insert Cost of @', 3);
            }
            
            if (!data.sellingPrice) {
              this.addStock();
              return this.serveMe.showAlert('Kindly insert Selling Price', 3);
            }
            data.qty = +data.qty;
            data.costOfEach = +data.costOfEach;
            data.sellingPrice = +data.sellingPrice;
            if (data.beforePrice) {
              data.beforePrice = + data.beforePrice;
            }
            data.timeStamp = 0;
            data.prodUid = this.theUID;
            this.serveMe.creatNewProd(data, 'stock');
          }
        }
      ]
    });

    await alert.present();
  }
}
