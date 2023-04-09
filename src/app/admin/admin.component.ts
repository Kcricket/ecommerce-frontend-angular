import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { KeyValuePipe } from '@angular/common';

import { Category } from '../models/Category.model';
import { Product } from '../models/Product.model';

import { ProductService } from '../service/productService/product.service';
import { FileHandle } from '../models/File-handle.model';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';
import { OrderUX } from '../models/OrderUX.model';
import { User } from '../models/User.model';
import { UserService } from '../service/user.service';
import { ProductUX } from '../models/ProductUX.model';
import {Dialog, DialogRef, DIALOG_DATA} from '@angular/cdk/dialog';
export interface DialogData {
  order:any
  animal: any;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  categoriesx: any = null;
  productForm: FormGroup;
  categories: any;
  productFormData: FormData;
  categoryForm: FormGroup;
  product: Product;

  // Table of orders
  orders:OrderUX[]=[];
  datasource = new MatTableDataSource<OrderUX>(this.orders);
  displayedColumns: string[] = ['product name', 'price', 'date', 'order status', "user"];
  //Statistics
  topUsers: User[] = [];
  topProducts: ProductUX[] = [];

  sampleProduct:Product = {
      title: "Sample Product",
      price: 100,
      category: {id: 1, name: "Sample Category"},
      parameters: new Map<string, string>([
        ["key1", "value1"],
        ["key2", "value2"]
      ]),
      weight: 10,
      volume: 10,
      quantityInStock: 10,
      productImages: []
  }

  animal: any = "";
  order:any;


  constructor(
    //private fb: FormBuilder,
    private productService: ProductService,
    private userService: UserService,
    private builder: FormBuilder,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer,
    private dialog: Dialog
    ) {}
  openDialog(order): void {
    const dialogRef = this.dialog.open<string>(CdkDialogOverviewExampleDialog, {
      width: '250px',
      data: {order: order, animal: this.animal},
    });

    dialogRef.closed.subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  ngOnInit() {
    this.getAllOrders();
    this.getTopUsers();
    this.getTopProducts();
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

    this.categoryForm = this.builder.group({
      name: this.builder.control('', Validators.compose([Validators.required]))
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.datasource.filter = filterValue.trim().toLowerCase();
  }
  getAllOrders() {
    this.productService.getAllOrders().subscribe(
      (data:any) => {
        this.datasource = data;
        console.log(this.orders);
      },
      error => {
        console.log(error);
      }
    );
  }
  //

  get parameters(): FormArray {
    return this.productForm.get('parameters') as FormArray;
  }

  getParameterFormControl(index: number, controlName: string) {
    return this.parameters.at(index).get(controlName);
  }

  //Stats mthods
  getTopUsers() {
    this.userService.getUsersWithMostOrders().subscribe(
      (data:any) => {
        this.topUsers = data;
        console.log(this.topUsers);
      },
      error => {
        console.log(error);
      }
    );
  }

  getTopProducts() {
    this.productService.getTopProducts().subscribe(
      (data:any) => {
        this.topProducts = data;
        console.log(this.topProducts);
      },
      error => {
        console.log(error);
      }
    );
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
  onFileSelected(event) {
    //Check if there are multiple files
    if(event.target.files){
      const file = event.target.files[0];
      const fileHandle : FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file))
      }
    this.sampleProduct.productImages.push(fileHandle);
    }
  }

  //Add a new category
  addCategory() {
    let category : Category = {
      id: null,
      name: this.categoryForm.value.name
    }
    this.productService.addCategory(category).subscribe(
      data => {
        this.toastr.success('Category added successfully');
        this.productService.getCategories().subscribe(categories => this.categories = categories);
      },
      error => {
        this.toastr.error('Error adding category');
      }
    );
  }
  //Method to prepare From Data to send to the server
  public prepareFormData(product: Product) {
    //Convert parameters as Map
    var paramsMap = this.productForm.value.parameters.reduce(function(map, obj) {
      map[obj.key] = obj.value;
      return map;
    }, {});
    console.log(paramsMap);

    product.parameters = paramsMap;

    const formData = new FormData();

    //This is the data the server wants, a product and a list of images
    formData.append(
      'product',
      new Blob([JSON.stringify(product)], {type: 'application/json'})
    );
    //Here we append each image to the form data
    for (let i = 0; i < product.productImages.length; i++) {
      formData.append(
        'imageFile',
        product.productImages[i].file,
        product.productImages[i].file.name

      );
    }
    return formData;
  }
  onSubmit() {
     var product ={
      title: this.productForm.value.title,
      price: this.productForm.value.price,
      category: this.productForm.value.category,
      parameters: this.productForm.value.parameters,
      weight: this.productForm.value.weight,
      volume: this.productForm.value.volume,
      quantityInStock: this.productForm.value.quantityInStock,
      // For some reason i cant retrieve the images from the productForm, so i use the sample product
      productImages: this.sampleProduct.productImages
    }
    this.productFormData = this.prepareFormData(product);
    console.log(this.productForm.value);
    // Here we convert the array of parameters to a map because the backend expects a map.

    this.productService.addNewProduct(this.productFormData).subscribe(
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
  removeImage(index: number) {
    this.sampleProduct.productImages.splice(index, 1);
  }


}

@Component({
  selector: 'cdk-dialog-overview-example-dialog',
  templateUrl: 'cdk-dialog-overview-example-dialog.html',
  styleUrls: ['cdk-dialog-overview-example-dialog.css'],
})
export class CdkDialogOverviewExampleDialog {
  constructor(public dialogRef: DialogRef<any>, @Inject(DIALOG_DATA) public data: DialogData) {}
}







