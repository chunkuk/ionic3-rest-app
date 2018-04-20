import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Observable} from "rxjs/Observable";

import {RestProvider} from "../../providers/rest/rest";
import {Product} from "../../models/product";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  products: Observable<Product[]>;

  constructor(
    public navCtrl: NavController,
    public restProvider: RestProvider
  ) {
  }

  ionViewDidLoad() {
    this.products = this.restProvider.getProducts();
  }

  createProduct() {
    this.navCtrl.push("ProductPage", {product: {}});
  }

  navToProductDetail(product: Product) {
    this.navCtrl.push("ProductPage", {product: product});
  }
}
