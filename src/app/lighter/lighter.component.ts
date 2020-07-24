import { Component, OnInit, Input } from '@angular/core';
import { ServemeService } from '../service/serveme.service';

@Component({
  selector: 'app-lighter',
  templateUrl: './lighter.component.html',
  styleUrls: ['./lighter.component.scss'],
})
export class LighterComponent implements OnInit {
  @Input() prod: any;
  theSales: any;
  constructor(
    private servMe: ServemeService
  ) {

   }

  ngOnInit() {

  }
  addTocart(prod) {
    
    this.servMe.cart.push(prod);
    console.log(this.servMe.cart)
  }
}
