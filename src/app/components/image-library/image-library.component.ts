import {Component, OnInit} from '@angular/core';
import {ImageService} from "../../services/image.service";
import {Observable} from "rxjs";
import {Image} from "../../model/image";

@Component({
  selector: 'app-image-library',
  templateUrl: './image-library.component.html',
  styleUrl: './image-library.component.css'
})
export class ImageLibraryComponent implements OnInit {
  onInit!: boolean;
  imageUpload$: Observable<Image> | undefined;


  constructor(private imageService: ImageService) {
  }

  ngOnInit(): void {
    this.onInit = true;
  }

  uploadImage($event: Event) {
    this.onInit = false;
    this.imageUpload$ = this.imageService.uploadImage($event);
  }
}
