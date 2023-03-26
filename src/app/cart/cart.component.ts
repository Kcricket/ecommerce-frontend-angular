import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { ProductService } from '../service/productService/product.service';
import { ProductUX } from '../models/ProductUX.model';
import { ImageProcessorService } from '../service/productService/image-processor.service';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../service/user.service';
import { AddressUX } from '../models/AddressUX.model';
import { AuthService } from '../service/auth.service';
import { Cart } from '../models/Cart.model';
import { Order } from '../models/Order.model';
import { Address } from '../models/Address.model';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: {showError: true},
  }]
})
export class CartComponent {
  addressForm: FormGroup;
  creditCardForm: FormGroup;
  items:any;
  userAddresses: AddressUX[] = [];





  finalPrice: number = 0;

  firstFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private userService: UserService,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    if(this.isLoggedIn()){
      this.getCartItems();
      this.getUserAddresses()
    }

    this.addressForm = new FormGroup({
      Country: new FormControl('', [Validators.required, Validators.minLength(3)]),
      City: new FormControl('', [Validators.required, Validators.minLength(3)]),
      PostCode: new FormControl('', [Validators.required, Validators.minLength(3)]),
      Street: new FormControl('', [Validators.required, Validators.minLength(3)]),
      Home: new FormControl('', [Validators.required, Validators.minLength(3)]),
      Apartment: new FormControl('', [Validators.required, Validators.minLength(3)])
    });

    this.creditCardForm = new FormGroup({
      CardHolder: new FormControl('', [Validators.required, Validators.minLength(3)]),
      CardNumber: new FormControl('', [Validators.required, Validators.minLength(3)]),
      ExpirationDate: new FormControl('', [Validators.required, Validators.minLength(3)]),
      Cvv: new FormControl('', [Validators.required, Validators.minLength(3)])
    });

  }
  placeOrder(){
    //if user isLoggedin

    if(!this.isLoggedIn()){
      this.toastr.error('You must be logged in and have an address to place an order', 'Error');
    }else{
      let address: AddressUX = this.userAddresses[0];
      let items:Cart[] = this.items;
      let paymentMethod= {
        "name": this.creditCardForm.value.CardHolder,
        "cardNumber": this.creditCardForm.value.CardNumber,
        "expirationDate": this.creditCardForm.value.ExpirationDate,
        "cvv": this.creditCardForm.value.Cvv
      };
      let order:Order = {
        userAddress: address,
        cart : items,
        paymentMethod: paymentMethod,
        deliveryMethod: "NORMAL"
      }
      this.productService.placeOrder(order).subscribe((data: any) => {
        this.toastr.success('Order placed', 'Success');
      }
      , (error) => {
        console.log(error);
        this.toastr.error('Order not placed', 'Error');
      });
    }

  }

  //Get addresses from service
  getUserAddresses(){
    this.userService.loadUserAddresses()
    .subscribe((data: AddressUX[]) => {
      this.userAddresses = data;
      console.log(this.userAddresses);
    }, (error) => {
      console.log(error);
    });
  }

  getCartItems(){
    this.productService.getCartItems()
    .subscribe((data: any) => {
      this.items = data;
      this.finalPrice = 0;
      this.items.forEach(element => {
        this.finalPrice += element.product.price;
      });
      console.log(data);
    }, (error) => {
      console.log(error);
    });
  }

  removeProductFromCart(cartId: number){
    this.productService.removeProductFromCart(cartId)
    .subscribe((data: any) => {
      this.getCartItems();
      this.toastr.success('Product removed from cart', 'Success');
    }, (error) => {
      console.log(error);
    });
  }



  isLoggedIn(){
    return this.authService.isLoggedIn();
  }
}
