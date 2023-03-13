import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Category } from '../../models/Category.model';
import { Product } from 'src/app/models/Product.model';

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

  public addNewProduct(productData: Product) {
    return this.httpclient.post(this.PATH_OF_API + '/addNewProduct', productData, {
      headers: this.requestHeader,
    });
  }
  public getCategories() {
    return this.httpclient.get(this.PATH_OF_API + '/getAllCategories', {
    });
  }
}
