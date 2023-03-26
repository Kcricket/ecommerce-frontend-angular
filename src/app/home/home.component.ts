import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/productService/product.service';
import { ProductUX } from '../models/ProductUX.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ImageProcessorService } from '../service/productService/image-processor.service';
import { map } from 'rxjs';
import { FileHandle } from '../models/File-handle.model';
import { ProductPreviewComponent } from '../product-preview/product-preview.component';
import { MatDialog } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: ProductUX[] = [];
  productImages: FileHandle[] = [];
  productDetails: [];
  mybreakpoint: number;
  searchFormControl: FormControl;
  constructor(
    private productService: ProductService,
    private imageProcessorService: ImageProcessorService,
    public imagesDialog: MatDialog
  ) {


  }

  ngOnInit() {
    this.getAllProducts();
    this.mybreakpoint = (window.innerWidth <= 600) ? 1 : 3;

    this.searchFormControl = new FormControl('', [Validators.required]);

  }

  addToCart(priductId : number) {
    this.productService.addToCart(priductId).subscribe(
      (rsp: any) => {
        console.log(rsp);
      }, (error) => {
        console.error(error);
      }
    );
  }
  showImages(product: ProductUX) {
    console.log(product);
    this.imagesDialog.open(ProductPreviewComponent, {
      data: {
        product: product
      },
      height: '500px',
      width: '800px'
    });

  }
  //Handle the breakpoint for the grid
  handleSize(event) {
    this.mybreakpoint = (event.target.innerWidth <= 600) ? 1 : 3;
    }

  getAllProducts(searchKeyword: string="") {
    this.productService.getAllProducts(searchKeyword)
    .pipe(
      map((products: ProductUX[]) => {
        products.forEach(product => {
          this.imageProcessorService.createImages(product);
        });
        return products;
      })
    )
    .subscribe(
      (rsp: ProductUX[]) => {
      this.products = rsp;
      console.log(rsp);

    }, (error:HttpErrorResponse) => {
      console.error(error);
    }

    );
  }

  searchByKeyword(searchKeyword: string) {
      this.productDetails =[];
      this.getAllProducts(searchKeyword)
  }

}


