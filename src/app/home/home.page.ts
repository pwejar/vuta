import { Component, OnInit } from '@angular/core';
import { ServemeService } from '../service/serveme.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  photo: any;
  products: any;
  testt: any;
  categories: string[] = [];
  advert: any[] = ['asd1','asd2','asd3','asd4'];
  templete: {
    uID: '834874754',
    name: 'Philips SHe werew Headphone',
    brand: 'philips',
    oldPrice: '',
    newPrice: '',
    pictures: ['url1', 'url2', 'url3'],
    details: 'Its all about the bass! Nothing beats the Philips SHE1350/00 earbud headphones when it comes to the bass sound. Designed with rubberized caps for comfort listening and sensitive microphones for easy control while talking on your mobile phone. Order for this Philips SHE1350/00 online from Jumia Kenya and have it delivered right to your doorstep.',
    keyFeatures: ['Bass beat vents allow air movement for better sound with a deep rich bass', 'Frequency Response: 16 to 20000 hertz.'],
    inTheBox: ['Earbud Headphone (SHE1350/00) - Black', 'grinder'],
    specification: [{speck: 'Ram', detailSp: '34gb'}]
  };
  constructor(
    public serveMe: ServemeService
  ) {
    this.categories = this.serveMe.categories;
    this.serveMe.read_products('products').subscribe(data => {

      this.products = data.map(e => {

        return {
          brand: e.payload.doc.data()['brand'],
          category: e.payload.doc.data()['category'],
          details: e.payload.doc.data()['details'],
          inTheBox: e.payload.doc.data()['inTheBox'],
          keyFeatures: e.payload.doc.data()['keyFeatures'],
          name: e.payload.doc.data()['name'],
          pictures: e.payload.doc.data()['pictures'],
          specification: e.payload.doc.data()['specification']
        };
      });

    });

  }
  ngOnInit(): void {
  

  }
  singMeOut() {
    this.serveMe.logout();
  }
  startAnimation() {

    this.testt = document.getElementById('njugu');
    const jkl = this.testt.getElementsByClassName('advertMee');
    let indexs = 0;
    console.log(jkl);
    for (const jk of jkl) {
      jk.style.transition = 'all 3s ease-out 2s';
      jk.style.transform = 'scale(5)';
      jk.style.display = 'none';
      console.log('1')
      indexs ++;
    }
  }

}
