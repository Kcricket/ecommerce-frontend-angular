import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';


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
  firstFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
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
      CVV: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }



}
