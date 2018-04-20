import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Product} from "../../models/product";
import {RestProvider} from "../../providers/rest/rest";
import {HomePage} from "../home/home";

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  selectProduct: Product;

  constructor(
    public toastCtrl: ToastController,
    public restProvider: RestProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.selectProduct = new Product(this.navParams.get('product'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
    // alert(this.selectProduct.name);
  }

  saveProduct(product: Product) {
    if( product.id ) {
      this.restProvider.updateProduct(product).subscribe( res =>{
        this.selectProduct = res;
        this.showSuccessMessage('Product ' + res.id + ': ' + res.name + ' 수정됨.');
        this.navCtrl.setRoot(HomePage);
      });
    }
    else {
      this.restProvider.createProduct(product).subscribe(res => {
        this.selectProduct = res;
        this.showSuccessMessage('Product ' + res.id + ': ' + res.name + ' 등록됨.');
        this.navCtrl.setRoot(HomePage);
      });
    }
  }

  deleteProduct(product: Product) {
    this.restProvider.deleteProduct(product).subscribe(res => {
      this.selectProduct = new Product({});
      this.showSuccessMessage('Product ' + product.id + ': ' + product.name + ' 삭제됨.');
      this.navCtrl.setRoot(HomePage);
    });
  }

  showSuccessMessage(msg: string) {
    this.toastCtrl.create({
      message: msg,
      showCloseButton: true,
      duration: 3000,
      position: 'middle'
    }).present()
  }
}
