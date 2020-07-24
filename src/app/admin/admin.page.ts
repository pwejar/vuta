import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, tap } from 'rxjs/operators';
import { ServemeService } from '../service/serveme.service';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  fileSize: any;
  task: any;
  snapshot: Observable<any>;
  percentage: Observable<number>;
  searchR: any;
  searchV: any;
  imgSrc = '/assets/default.svg';
  selectedImage: any = null;
  pictures = [];
  isLoading = false;
  products: any;
  name = '';
  brand = '';
  category = '';
  details = '';
  feature = '';
  features = [];
  specification = [];
  inTheBox = [];
  itemBox = '';
  speck = '';
  detailSp = '';
  categories: string[] = [];
  constructor(
    private storage: AngularFireStorage,
    private servMe: ServemeService,
    private alertController: AlertController
  ) {
    this.categories = this.servMe.categories;
    console.log(this.categories)
    this.servMe.read_products('products').subscribe(data => {

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

  ngOnInit() {

  }
  resetForm(){
    this.pictures = [];
    this.name = '';
    this.brand = '';
    this.category = '';
    this.details = '';
    this.feature = '';
    this.features = [];
    this.specification = [];
    this.inTheBox = [];
    this.itemBox = '';
    this.speck = '';
    this.detailSp = '';
  }
  searchThis(event) {
    console.log(this.products);
    const searchTerm = event.srcElement.value;
    if (!searchTerm) {
      this.searchR = undefined;
      return;
    }
    this.searchR = this.products.filter(currentGoal => {
      if ( searchTerm) {
        if (currentGoal.brand) {
          if (currentGoal.brand.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
            return true;
          }
        }
        if (currentGoal.name) {
          if (currentGoal.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
            return true;
          }
        }
        return false;
      }
    });

  }
  submitMEE() {

    if (this.pictures.length === 0) {
      return this.servMe.showAlert('Kindly add atleast one photo', 3);
    }
    if (this.category === '') {
      return this.servMe.showAlert('Kindly Select product category', 3);
    }
    if (this.name === '') {
      return this.servMe.showAlert('Kindly add Product Name', 3);
    }
    if (this.brand === '') {
      return this.servMe.showAlert('Kindly add Product Brand', 3);
    }
    if (this.details === '') {
      return this.servMe.showAlert('Kindly add Product details', 3);
    }
    if (this.features.length === 0) {
      return this.servMe.showAlert('Kindly add atleast Key Feature', 3);
    }
    if (this.inTheBox.length === 0) {
      return this.servMe.showAlert('Kindly add atleast one Item in Package', 3);
    }
    if (this.specification.length === 0) {
      return this.servMe.showAlert('Kindly add atleast one Specks', 3);
    }
    this.details = this.details.replace(/\r?\n/g, '<br />');
    const theProduct = {
      name: this.name,
      brand: this.brand,
      pictures: this.pictures,
      category: this.category,
      details: this.details,
      keyFeatures: this.features,
      inTheBox: this.inTheBox,
      specification: this.specification,
      stock: 0,
      sellingPrice: 0,
      beforePrice: 0

    };
    this.servMe.creatNewProd(theProduct,'products').then(()=>{
      this.resetForm();
    }).catch(errrr => {
      console.log(errrr);
    });
  }
  addFeature(namba: number) {
    switch (namba) {
      case 1 :
        if (this.features.indexOf(this.feature) > -1){
          return this.feature = '';
        }
        if (this.feature !== '') {
          this.features.push(this.feature);
          this.feature = '';
        }
        break;
      case 2 :
          if (this.inTheBox.indexOf(this.itemBox) > -1){
            return this.itemBox = '';
          }
          if (this.itemBox !== '') {
            this.inTheBox.push(this.itemBox);
            this.itemBox = '';
          }
          break;
      case 3 :
          for (const specs of this.specification) {
            if (specs.speck === this.speck) {
              this.servMe.showAlert( this.speck + 'Has already been added', 2);
              this.speck = '';
              this.detailSp = '';
              return;
            }
          }
          if (this.speck !== '' && this.detailSp !== '') {
            this.specification.push({speck: this.speck, detailSp: this.detailSp});
            this.speck = '';
            this.detailSp = '';
          }
          break;
    }
  }
  subFeature(feature: string, nambe: number) {
    switch (nambe) {
      case 1 :
        const index = this.features.indexOf(feature);
        if (index > -1) {
          this.features.splice(index, 1);
        }
        break;
      case 2 :
        const indexx = this.inTheBox.indexOf(feature);
        if (indexx > -1) {
          this.inTheBox.splice(indexx, 1);
        }
        break;
      case 3 :
        const indexxx = this.specification.indexOf(feature);
        if (indexxx > -1) {
          this.specification.splice(indexxx, 1);
        }
        break;
    }
  }
  showPrev(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgSrc = '/assets/default.svg';
      this.selectedImage = null;
    }
  }
  uploadFile1() {
    if (this.selectedImage && !this.isLoading) {
      this.isLoading = true;
      const iggg = document.getElementById('coolBtn');
      iggg.style.opacity = '0.2';
      const path = '/products/' + this.selectedImage.name + '_' + new Date();
      const fileRef = this.storage.ref(path);
      const task = this.storage.upload(path, this.selectedImage);
      task.snapshotChanges().pipe(
        finalize(() => {
          const theur = fileRef.getDownloadURL();
          theur.subscribe(url => {
            this.pictures.push(url);
            iggg.style.opacity = '1';
            this.isLoading = false;
            this.imgSrc = '/assets/default.svg';
            this.selectedImage = null;
            this.percentage = null;
          });
        })
      )
      .subscribe();
      this.percentage = task.percentageChanges();
     
      console.log(this.percentage);
    }
    if (!this.selectedImage){
      this.servMe.showAlert('Kindly Choose File first', 2);
    }
  }
 async deletePhoto(src) {

      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Confirm!',
        message: '<img src="' + src + '">',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Delete',
            handler: () => {
              const index = this.pictures.indexOf(src);
              if (index > -1) {
                this.pictures.splice(index, 1);
              }
              this.storage.storage.refFromURL(src).delete().then(dattt => {
                console.log(dattt);
              }).catch(errrr => {
                console.log(errrr);
              });
            }
          }
        ]
      });

      await alert.present();

  }
}
