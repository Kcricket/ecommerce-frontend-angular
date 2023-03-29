import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '../service/user.service';
import { User } from '../models/User.model';

import { Address } from '../models/Address.model';
import { AddressUX } from '../models/AddressUX.model';
import { ChangePasswordRequest } from '../models/ChangePasswordRequest.model';
import { ProductService } from '../service/productService/product.service';
import { OrderUX } from '../models/OrderUX.model';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent{
  profileForm: FormGroup;
  addressForm: FormGroup;
  passwordForm: FormGroup;

  user: User;
  userAddressesUX: AddressUX[] =[];

  orders: OrderUX[] = [];
  displayedColumns: string[] = ['product name', 'price', 'date', 'order status'];

  //dataSource = [];
  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    private productService: ProductService,
  ) {

  }

  ngOnInit() {
    //this.user = this.userService.getUser();
    this.loadUserAddresses();
    this.loadUserData();
    this.getUserOrders();
    console.log(this.user);
    this.profileForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      bio: new FormControl('', [Validators.required, Validators.minLength(10)])
    });

    this.addressForm = new FormGroup({
      country: new FormControl('', [Validators.required, Validators.minLength(3)]),
      city: new FormControl('', [Validators.required, Validators.minLength(3)]),
      postalCode: new FormControl('', [Validators.required, Validators.minLength(3)]),
      street: new FormControl('', [Validators.required, Validators.minLength(3)]),
      home: new FormControl('', [Validators.required, Validators.minLength(1)]),
      apartment: new FormControl('', [Validators.required, Validators.minLength(1)])
    });

    this.passwordForm = new FormGroup({
      currentPassword: new FormControl('', [Validators.required, Validators.minLength(3)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(3)]),
      confirmNewPassword: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  loadUserData() {
    this.userService.loadUserData().subscribe(
      (response: any) => {
        this.user = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  saveProfile() {
    if (this.profileForm.valid) {
      // TODO: Implement save logic
      const { name, email, bio } = this.profileForm.value;
      console.log(`Saving profile: ${name}, ${email}, ${bio}`);
      this.toastr.success('Profile saved successfully!');
    } else {
      this.toastr.error('Please fill in all required fields.');
    }
  }
  //------------------Address------------------
  loadUserAddresses() {
    this.userService.loadUserAddresses().subscribe(
      (response: AddressUX[]) => {
        this.userAddressesUX = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteAddress(addressid: number) {
    this.userService.deleteAddress(addressid).subscribe(
      (response: any) => {
        console.log(response);
        //Toastr success
        this.loadUserAddresses();

        this.toastr.success('Address deleted successfully!');
      },
      (error) => {
        console.log(error);
        this.toastr.error('There has been an error with your address!');

      }
    );
  }
  saveAddress() {
    if (this.addressForm.valid) {
      //Call service to save address
      let address: AddressUX = {
        id : null,
        country: this.addressForm.value.country,
        city: this.addressForm.value.city,
        postalCode: this.addressForm.value.postalCode,
        street: this.addressForm.value.street,
        home: this.addressForm.value.home,
        apartment: this.addressForm.value.apartment,
        user: null
      }
      this.userService.saveAddress(address).subscribe(
        (response: any) => {
          this.toastr.success('Address saved successfully!');

          this.loadUserAddresses();
          console.log(response);
        }, (error) => {
          console.log(error);
          this.toastr.error('There has been an error with your address!');

        }
      );
    } else {
      this.toastr.error('Please fill in all required fields.');

    }
  }
  //------------------Password------------------
  saveNewPassword() {
    if (this.passwordForm.valid) {
      // Call service to save new password
      let passForm : ChangePasswordRequest = {
        oldPassword: this.passwordForm.value.currentPassword,
        newPassword: this.passwordForm.value.newPassword,
      }
      this.userService.saveNewPassword(passForm).subscribe(
        (response: any) => {
          this.toastr.success('Password changed successfully!');
          console.log(response);
        }, (error) => {
          console.log(error);
          this.toastr.error('There has been an error with your password!');
        }
      );
    }else{
      this.toastr.error('Please fill in all required fields.');
    }

  }
  getUserOrders(){
    this.productService.getUserOrders().subscribe((data: any) => {
      console.log(data);
      this.orders = data;
    }
    , (error) => {
      console.log(error);
    });
  }

  cancelProfile() {
    // TODO: Implement cancel logic
    console.log('Canceling profile');
    this.toastr.info('Changes discarded.');
  }

}
