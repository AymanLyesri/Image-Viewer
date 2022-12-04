import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Image } from '../models/Image';
import { ImageService } from '../services/image.service';

import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  compressedImages: { name: string; image: string }[] = [];

  imgResultBeforeCompress: string[] = [];
  imgResultAfterCompress: string[] = [];
  imgResultMultiple: {
    image: string;
    fileName: string;
    orientation: number;
  }[] = [];

  ready: boolean = false;

  constructor(
    private imageservice: ImageService,
    private imageCompress: NgxImageCompressService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.compressedImages.forEach((compressedImage) => {
      this.imageservice.addImage(compressedImage);
    });

    this.imgResultBeforeCompress.splice(0);
    this.imgResultAfterCompress.splice(0);
  }

  uploadMultipleFiles() {
    return this.imageCompress
      .uploadMultipleFiles()
      .then(
        (
          filelist: { image: string; fileName: string; orientation: number }[]
        ) => {
          this.imgResultMultiple = filelist;
          console.warn(`${filelist.length} files selected`);

          filelist.forEach((file, index: number) => {
            console.warn(
              index,
              'Old Size in bytes:',
              this.imageCompress.byteCount(file.image)
            );

            this.imgResultBeforeCompress.push(file.image);

            this.imageCompress
              .compressFile(file.image, file.orientation, 50, 50)
              .then((result: string) => {
                this.imgResultAfterCompress.push(result);
                console.warn(
                  `Compressed: ${result.substring(0, 50)}... (${
                    result.length
                  } characters)`
                );
                console.warn(
                  index,
                  'Size in bytes is now:',
                  this.imageCompress.byteCount(result)
                );

                this.compressedImages.push({
                  name: file.fileName,
                  image: result,
                });
              });
          });
          this.ready = true;
        }
      );
  }
  // onFileSelect(event: Event) {
  //   this.imageData.splice(0);

  //   const files = (event.target as HTMLInputElement).files;

  //   console.log(files);

  //   this.form.patchValue({ images: files });
  //   const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];

  //   for (let index = 0; index < files.length; index++) {
  //     if (files && allowedMimeTypes.includes(files[index].type)) {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         this.imageData[index] = reader.result as string;
  //       };
  //       reader.readAsDataURL(files[index]);
  //     }
  //   }

  //   // (event.target as HTMLInputElement).value = '';
  // }
}
