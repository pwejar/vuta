import { Component, OnInit } from '@angular/core';
import { ServemeService } from '../service/serveme.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  cat1: any[] = [];
  cat2: any[] = [];
  cat3: any[] = [];
  cat4: any[] = [];
  cat5: any[] = [];
  cat6: any[] = [];
  cat7: any[] = [];
  cat8: any[] = [];
  cat9: any[] = [];
  cat10: any[] = [];
  photo: any;
  products: any;
  testt: any;
  categories: string[] = [];
  advert: any[] = ['asd1', 'asd2', 'asd3', 'asd4'];
  templete: [{
    ppUID: '834874754',
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
  weData: any[] = [];

  constructor(
    public serveMe: ServemeService
  ) {
    this.categories = this.serveMe.categories;
    this.serveMe.read_products('products').subscribe(data => {
      this.products = data.map(e => {

        return {
          pUID: e.payload.doc.id,
          brand: e.payload.doc.data()['brand'],
          category: e.payload.doc.data()['category'],
          details: e.payload.doc.data()['details'],
          inTheBox: e.payload.doc.data()['inTheBox'],
          keyFeatures: e.payload.doc.data()['keyFeatures'],
          name: e.payload.doc.data()['name'],
          pictures: e.payload.doc.data()['pictures'],
          specification: e.payload.doc.data()['specification'],
          sellingPrice: e.payload.doc.data()['sellingPrice'],
          beforePrice: e.payload.doc.data()['beforePrice'],
        };
      });

    });
    this.serveMe.orderSales('products', 'category', this.serveMe.categories[0], 10).subscribe(data => {
      this.cat1 = data.map(e => {

        return {
          pUID: e.payload.doc.id,
          brand: e.payload.doc.data()['brand'],
          category: e.payload.doc.data()['category'],
          details: e.payload.doc.data()['details'],
          inTheBox: e.payload.doc.data()['inTheBox'],
          keyFeatures: e.payload.doc.data()['keyFeatures'],
          name: e.payload.doc.data()['name'],
          pictures: e.payload.doc.data()['pictures'],
          specification: e.payload.doc.data()['specification'],
          sellingPrice: e.payload.doc.data()['sellingPrice'],
          beforePrice: e.payload.doc.data()['beforePrice'],
        };
      });

    });
    this.serveMe.orderSales('products', 'category', this.serveMe.categories[1], 10).subscribe(data => {
      this.cat2 = data.map(e => {

        return {
          pUID: e.payload.doc.id,
          brand: e.payload.doc.data()['brand'],
          category: e.payload.doc.data()['category'],
          details: e.payload.doc.data()['details'],
          inTheBox: e.payload.doc.data()['inTheBox'],
          keyFeatures: e.payload.doc.data()['keyFeatures'],
          name: e.payload.doc.data()['name'],
          pictures: e.payload.doc.data()['pictures'],
          specification: e.payload.doc.data()['specification'],
          sellingPrice: e.payload.doc.data()['sellingPrice'],
          beforePrice: e.payload.doc.data()['beforePrice'],
        };
      });

    });
    this.serveMe.orderSales('products', 'category', this.serveMe.categories[2], 10).subscribe(data => {
      this.cat3 = data.map(e => {

        return {
          pUID: e.payload.doc.id,
          brand: e.payload.doc.data()['brand'],
          category: e.payload.doc.data()['category'],
          details: e.payload.doc.data()['details'],
          inTheBox: e.payload.doc.data()['inTheBox'],
          keyFeatures: e.payload.doc.data()['keyFeatures'],
          name: e.payload.doc.data()['name'],
          pictures: e.payload.doc.data()['pictures'],
          specification: e.payload.doc.data()['specification'],
          sellingPrice: e.payload.doc.data()['sellingPrice'],
          beforePrice: e.payload.doc.data()['beforePrice'],
        };
      });

    });
    this.serveMe.orderSales('products', 'category', this.serveMe.categories[3], 10).subscribe(data => {
      this.cat4 = data.map(e => {

        return {
          pUID: e.payload.doc.id,
          brand: e.payload.doc.data()['brand'],
          category: e.payload.doc.data()['category'],
          details: e.payload.doc.data()['details'],
          inTheBox: e.payload.doc.data()['inTheBox'],
          keyFeatures: e.payload.doc.data()['keyFeatures'],
          name: e.payload.doc.data()['name'],
          pictures: e.payload.doc.data()['pictures'],
          specification: e.payload.doc.data()['specification'],
          sellingPrice: e.payload.doc.data()['sellingPrice'],
          beforePrice: e.payload.doc.data()['beforePrice'],
        };
      });

    });
    this.serveMe.orderSales('products', 'category', this.serveMe.categories[4], 10).subscribe(data => {
      this.cat5 = data.map(e => {

        return {
          pUID: e.payload.doc.id,
          brand: e.payload.doc.data()['brand'],
          category: e.payload.doc.data()['category'],
          details: e.payload.doc.data()['details'],
          inTheBox: e.payload.doc.data()['inTheBox'],
          keyFeatures: e.payload.doc.data()['keyFeatures'],
          name: e.payload.doc.data()['name'],
          pictures: e.payload.doc.data()['pictures'],
          specification: e.payload.doc.data()['specification'],
          sellingPrice: e.payload.doc.data()['sellingPrice'],
          beforePrice: e.payload.doc.data()['beforePrice'],
        };
      });

    });
    
  }
  ngOnInit(): void {


  }
  getList(numba: number) {
    switch(numba) {
      case 1:
        return this.cat1;
        break;
      case 2:
        return this.cat2;
        break;
      case 3:
        return this.cat3;
        break;
      case 4:
        return this.cat4;
        break;
      case 5:
        return this.cat5;
        break;
    }
  }
  signMeOut() {
    this.serveMe.logout();
  }

  setLogIn() {
    document.getElementById('containerMain').style.display = 'grid';
  }
}
