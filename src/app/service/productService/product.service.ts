import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Category } from '../../models/Category.model';
import { Product } from 'src/app/models/Product.model';
import { Order } from 'src/app/models/Order.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  PATH_OF_API = 'http://localhost:9090';

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  constructor(
    //private category: Category,
    private httpclient: HttpClient,
    private authService: AuthService
  ) {}

  // ------------------Admin Stats------------------

  public getTopProducts() {
    return this.httpclient.get(this.PATH_OF_API + '/getProductsWithMostOrders', {
      responseType: 'json',
    });
  }
  // ------------------Cart------------------
  public addToCart(productId: number) {
    return this.httpclient.get(this.PATH_OF_API + '/addToCart/'+productId );
  }

  public getCartItems() {
    return this.httpclient.get(this.PATH_OF_API + '/getCartItems');
  }

  public addNewProduct(productData: FormData) {
    return this.httpclient.post(this.PATH_OF_API + '/addNewProduct', productData);
  }
  public removeProductFromCart(cartId: number) {
    return this.httpclient.delete(this.PATH_OF_API + '/deleteCartItem/'+cartId);
  }
  // ------------------Product------------------
  public getCategories() {
    return this.httpclient.get(this.PATH_OF_API + '/getAllCategories', {
    });
  }
  public addCategory(category: Category) {
    return this.httpclient.post(this.PATH_OF_API + '/addNewCategory', category);
  }
  public getAllProducts(searchKeyword: string= "") {
    return this.httpclient.get<Product[]>(this.PATH_OF_API + '/getAllProducts?searchKey='+searchKeyword, {
    });
  }

  // ------------------ORder------------------
  public placeOrder(order: Order) {
    return this.httpclient.post(this.PATH_OF_API + '/order', order);
  }
  public getUserOrders() {
    return this.httpclient.get(this.PATH_OF_API + '/getUserOrders', {
    });
  }
  public getAllOrders() {
    return this.httpclient.get(this.PATH_OF_API + '/getAllOrders', {
    });
  }

}
