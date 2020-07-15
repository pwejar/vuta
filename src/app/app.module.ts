import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';

const config = {
  apiKey: 'AIzaSyAu8X6VwLat3j_EHCJvI4k5C50Cab4M1b8',
    authDomain: 'qtweef.firebaseapp.com',
    databaseURL: 'https://qtweef.firebaseio.com',
    projectId: 'qtweef',
    storageBucket: 'qtweef.appspot.com',
    messagingSenderId: '350404742412',
    appId: '1:350404742412:web:e0d5c7d11b88c22a378d29',
    measurementId: 'G-LH88L8HZW4'
};

@NgModule({
  declarations: [AppComponent ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    FormsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
