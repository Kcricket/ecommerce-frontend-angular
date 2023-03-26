import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from 'src/app/models/File-handle.model';
import { Product } from 'src/app/models/Product.model';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessorService {

  constructor(
    private sanitaizer: DomSanitizer
  ) { }
  //This method gets all images in byte form and converts them to blob
  public createImages(product: Product){
    const productImages: any[] = product.productImages;
    const imagesToFileHandle: FileHandle[] = [];

    for (let i = 0; i < productImages.length; i++) {
      const image = productImages[i];
      const imageBlob = this.convertImageToBlob(image.picByte, image.type);
      const imageFile = new File([imageBlob], image.name, { type: image.type });

      const fileHandle: FileHandle = {
        file: imageFile,
        url: this.sanitaizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))

      };

      imagesToFileHandle.push(fileHandle);
    }
    product.productImages = imagesToFileHandle;
    return product;
  }
  public convertImageToBlob(bytes, imageType): Blob {
    const byteCharacters = window.atob(bytes);
    const arrayBuffer = new ArrayBuffer(byteCharacters.length);
    const byteNumbers = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    return new Blob([byteNumbers], { type: imageType });
  }
}
