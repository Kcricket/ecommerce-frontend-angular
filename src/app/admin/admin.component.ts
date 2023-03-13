import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { KeyValuePipe } from '@angular/common';

import { Category } from '../models/Category.model';
import { Product } from '../models/Product.model';

import { ProductService } from '../service/productService/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  categoriesx: any = null;
  productForm: FormGroup;
  categories: any;
  //parameters: any;


  constructor(
    //private fb: FormBuilder,
    private productService: ProductService,
    private builder: FormBuilder,
    private toastr: ToastrService
    ) {}


  ngOnInit() {
    this.productService.getCategories().subscribe(categories => this.categories = categories);
    this.productForm = this.builder.group({
      title: this.builder.control('', Validators.compose([Validators.required])),
      price: this.builder.control('', Validators.compose([Validators.required])),
      weight: this.builder.control('', Validators.compose([Validators.required])),
      volume: this.builder.control('', Validators.compose([Validators.required])),
      quantityInStock: this.builder.control('', Validators.compose([Validators.required])),
      category: this.builder.control('', Validators.compose([Validators.required])),
      parameters: this.builder.array([])

    });
  }
  get parameters(): FormArray {
    return this.productForm.get('parameters') as FormArray;
  }

  getParameterFormControl(index: number, controlName: string) {
    return this.parameters.at(index).get(controlName);
  }

  addParameter() {
    this.parameters.push(this.builder.group({
      key: ['', Validators.required],
      value: ['', Validators.required]
    }));
  }

  removeParameter(index: number) {
    this.parameters.removeAt(index);
  }

  onSubmit() {
    console.log(this.productForm.value);
    var paramsMap = this.productForm.value.parameters.reduce(function(map, obj) {
      map[obj.key] = obj.value;
      return map;
    }, {});
    console.log(paramsMap);

    this.productForm.value.parameters = paramsMap;
    this.productService.addNewProduct(this.productForm.value).subscribe(
      (response: any) => {
        console.log(response);

        if(response != null) {
          this.toastr.success('Product added successfully');
        }else{
          this.toastr.error('Error adding product');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }


}







