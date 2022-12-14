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
    private imageService: ImageService,
    private imageCompress: NgxImageCompressService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.compressedImages.forEach((compressedImage) => {
      this.imageService.addImage(compressedImage);
    });

    this.imgResultBeforeCompress.length = 0;
    this.imgResultAfterCompress.length = 0;
  }

  getSize(data: string) {
    return new TextEncoder().encode(data).length * 0.001;
  }

  uploadMultipleFiles() {
    return this.imageCompress
      .uploadMultipleFiles()
      .then(
        (
          fileList: { image: string; fileName: string; orientation: number }[]
        ) => {
          this.compressedImages.length = 0;
          this.imgResultMultiple = fileList;

          fileList.forEach((file, index: number) => {
            console.warn(
              index,
              'Old Size in kbytes: ',
              this.getSize(file.image)
            );

            this.imgResultBeforeCompress.push(file.image);

            let quality: number = 80;

            if (file.image.substring(11, 14) == 'png')
              file.image = file.image.replace('png', 'jpeg');

            this.imageCompress
              .compressFile(
                file.image,
                file.orientation,
                100,
                quality,
                2000,
                2000
              )
              .then((result: string) => {
                this.imgResultAfterCompress.push(result);

                console.warn(
                  index,
                  'Size in kbytes is now:',
                  this.getSize(result)
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
}
