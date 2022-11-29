import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Image } from '../models/Image';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  form: FormGroup;
  images: Image[] = [];
  imageData: string[] = [];

  constructor(private imageservice: ImageService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null),
      images: new FormControl(null),
    });
  }

  onSubmit() {
    this.imageservice.addImages(this.form.value.name, this.form.value.images);
    this.form.reset();

    console.log('form value after reset : ', this.form.value);

    this.imageData.splice(0);
  }

  onFileSelect(event: Event) {
    this.imageData.splice(0);

    const files = (event.target as HTMLInputElement).files;

    console.log(files);

    this.form.patchValue({ images: files });
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    for (let index = 0; index < files.length; index++) {
      if (files && allowedMimeTypes.includes(files[index].type)) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageData[index] = reader.result as string;
        };
        reader.readAsDataURL(files[index]);
      }
    }

    // (event.target as HTMLInputElement).value = '';
  }
}
