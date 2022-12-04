import { Component, OnInit } from '@angular/core';

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

            if (this.imageCompress.byteCount(file.image) > 10000000) {
              this.imageCompress
                .compressFile(file.image, file.orientation, 20, 20, 700, 700)
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
            } else if (
              this.imageCompress.byteCount(file.image) > 1000000 &&
              this.imageCompress.byteCount(file.image) < 10000000
            ) {
              this.imageCompress
                .compressFile(file.image, file.orientation, 40, 40, 700, 700)
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
            } else {
              this.imageCompress
                .compressFile(file.image, file.orientation, 50, 50, 700, 700)
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
            }
          });
          this.ready = true;
        }
      );
  }
}
